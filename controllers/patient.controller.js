const sendEmail = require("../utils/sendEmail");
const catchAsync = require("../utils/catchAsync");

const Patient = require("../models/patient.model");
const Doctor = require("../models/doctor.model");
const Contact = require("../models/contact.model");
const ContactType = require("../models/contact-type.model");
const File = require("../models/files.model");
const CommentType = require("../models/comment-type.model");
const crypto = require("crypto");
const mongoose = require("mongoose");
const { log } = require("console");
const Comment = require("../models/comment.model");

module.exports = {
  createPatientController: catchAsync(async (req, res) => {
    const patient = await Patient.create(req.body);
    patient.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: `Patient added successfull.`,
      patient,
    });
  }),

  getPatientController: catchAsync(async (req, res) => {
    const { id } = req.params;
    // const patient = await Patient.findById(id);
    const patient = await Patient.findById(id).populate(
      "department diagnosis contact comment files doctors"
    );

    res.status(200).json({
      success: true,
      message: `Successfull.`,
      patient,
    });
  }),

  getPatientsController: catchAsync(async (req, res) => {
    const patients = await Patient.find().sort([["createdAt", -1]]);

    res.status(200).json({
      success: true,
      message: `Successfull.`,
      patients,
    });
  }),

  updatePatientController: catchAsync(async (req, res) => {
    const { id } = req.params;
    let patient = await Patient.findById(id);

    if (!patient)
      return res
        .status(400)
        .send({ success: false, message: "Invalid Patient Id" });

    patient = await Patient.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: `Successfull.`,
      patient,
    });
  }),

  deletePatientController: catchAsync(async (req, res) => {
    const { id } = req.params;

    const patient = await Patient.findById(id);
    if (!patient)
      return res
        .status(404)
        .send({ success: false, message: "Patient not found" });

    await Patient.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Deleted Successfull.`,
    });
  }),

  createContactTypeController: catchAsync(async (req, res) => {
    const { name, description } = req.body;

    let contactType = await ContactType.findOne({ name });

    if (contactType)
      return res.status(400).send({
        success: false,

        message: "Contact Type with given name exists",
      });

    contactType = await ContactType.create({ name, description });

    contactType.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,

      message: `Contact Type added successfull.`,

      contactType,
    });
  }),

  deleteContactTypeController: catchAsync(async (req, res) => {
    const { id } = req.params;

    const contactType = await ContactType.findById(id);
    if (!contactType)
      return res
        .status(404)
        .send({ success: false, message: "ContactType not found" });

    await ContactType.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Deleted Successfull.`,
    });
  }),

  getContactTypesController: catchAsync(async (req, res) => {
    const contactType = await ContactType.find().sort([["createdAt", -1]]);

    res.status(200).json({
      success: true,

      message: `Successfull.`,

      contactType,
    });
  }),

  createContactController: catchAsync(async (req, res) => {
    const { id } = req.params;
    let patient = await Patient.findById(id);
    if (!patient)
      return res
        .status(404)
        .send({ success: false, message: "Patient not found" });

    const contact = await Contact.create(req.body);

    patient = await Patient.findByIdAndUpdate(
      id,
      {
        $set: {
          contact: [...patient.contact, contact._id],
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      message: `Contact Added Successfull.`,
      contact,
    });
  }),

  addPatietFileController: catchAsync(async (req, res) => {
    const { id } = req.params;
    let patient = await Patient.findById(id);
    if (!patient)
      return res
        .status(404)
        .send({ success: false, message: "Patient not found" });

    if (!req.files || !req.files.file)
      return res
        .status("400")
        .send({ success: false, message: "No 'image' selected" });

    const { file } = req.files;

    const fileId = crypto.randomBytes(8).toString("hex");
    const imageLink = `${fileId + "_" + file.name}`;
    file.mv(`uploads/${imageLink}`);

    const savedFile = await File.create({
      name: req.body.name,
      description: req.body.description,
      size: file.size,
      filename: file.name,
      url: imageLink,
    });

    await Patient.findByIdAndUpdate(
      id,
      {
        $set: {
          files: [savedFile._id, ...patient.files],
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      message: `File Added Successfull.`,
      file: savedFile,
    });
  }),

  assignPatientController: catchAsync(async (req, res) => {
    const { pid, did } = req.params;
    let patient = await Patient.findById(pid);
    if (!patient)
      return res
        .status(404)
        .send({ success: false, message: "Patient not found" });

    let doctor = await Doctor.findById(did);
    if (!doctor)
      return res
        .status(404)
        .send({ success: false, message: "Doctor not found" });

    await Patient.findByIdAndUpdate(
      pid,
      {
        $set: {
          doctors: [did, ...patient.doctors],
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    await Doctor.findByIdAndUpdate(
      did,
      {
        $set: {
          patients: [pid, ...doctor.patients],
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    // Send email to doctor
    await sendEmail({
      to: doctor.email,
      from: process.env.FROM_EMAIL,
      subject: "Assigned New Patient",
      html: `
            <h2>Hello <strong> ${doctor.firstname}</strong></h2>
            </br>
            <p>This is to notify you that you have been assigned a new patient - ${
              patient.firstname + " " + patient.lastname
            }. </p>
            `,
    });

    res.status(200).json({
      success: true,
      message: `Doctor Assigned Successfull.`,
      doctor,
    });
  }),

  unAssignPatientController: catchAsync(async (req, res) => {
    const { pid, did } = req.params;
    let patient = await Patient.findById(pid);
    if (!patient)
      return res
        .status(404)
        .send({ success: false, message: "Patient not found" });

    let doctor = await Doctor.findById(did);
    if (!doctor)
      return res
        .status(404)
        .send({ success: false, message: "Doctor not found" });

    await Patient.findByIdAndUpdate(
      pid,
      {
        $set: {
          doctors: [...patient.doctors.filter((id) => id.valueOf() !== did)],
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    await Doctor.findByIdAndUpdate(
      did,
      {
        $set: {
          patients: [...doctor.patients.filter((id) => id.valueOf() !== pid)],
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      success: true,
      message: `Doctor Un Assigned Successfull.`,
    });
  }),

  createCommentTypeController: catchAsync(async (req, res) => {
    const { name, description } = req.body;

    let commentType = await CommentType.findOne({ name });
    if (commentType)
      return res.status(400).send({
        success: false,

        message: "Comment Type with given name exists",
      });

    commentType = await CommentType.create({ name, description });

    commentType.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,

      message: `Comment Type added successfull.`,

      commentType,
    });
  }),
  deleteCommentTypeController: catchAsync(async (req, res) => {
    const { id } = req.params;

    const commentType = await CommentType.findById(id);
    if (!commentType)
      return res
        .status(404)
        .send({ success: false, message: "CommentType not found" });

    await CommentType.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Deleted Successfull.`,
    });
  }),

  getCommentTypesController: catchAsync(async (req, res) => {
    const commentType = await CommentType.find().sort([["createdAt", -1]]);

    res.status(200).json({
      success: true,

      message: `Successfull.`,

      commentType,
    });
  }),
  updateCommentTypeController: catchAsync(async (req, res) => {
    const { id } = req.params;
    let commentType = await CommentType.findById(id);

    if (!commentType)
      return res
        .status(400)
        .send({ success: false, message: "Invalid Comment Type Id" });

    commentType = await CommentType.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: `Successfull.`,
      commentType,
    });
  }),

  createCommentController: catchAsync(async (req, res) => {
    const comment = await Comment.create(req.body);
    comment.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: `comment added successfull.`,
      comment,
    });
  }),
  //   asdfg

  //   getCommentsController: catchAsync(async (req, res) => {
  //     const { id } = req.params;
  //     // const patient = await Patient.findById(id);
  //     const comment = await Comment.findById(id).populate(
  //       "commenttype patientId senderId senderRole"
  //     );

  //     res.status(200).json({
  //       success: true,
  //       message: `Successfull.`,
  //       comment,
  //     });
  //   }),

    getCommentsController: catchAsync(async (req, res) => {
      const comments = await Comment.find().sort([["createdAt", -1]]);

      res.status(200).json({
        success: true,
        message: `Successfull.`,
        comments,
      });
    }),

  updateCommentController: catchAsync(async (req, res) => {
    const { id } = req.params;
    let comment = await Comment.findById(id);

    if (!comment)
      return res
        .status(400)
        .send({ success: false, message: "Invalid comment Id" });

    comment = await Comment.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: `Successfull.`,
      comment,
    });
  }),

  deleteCommentController: catchAsync(async (req, res) => {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment)
      return res
        .status(404)
        .send({ success: false, message: "comment not found" });

    await Comment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: `Deleted Successfull.`,
    });
  }),
};
