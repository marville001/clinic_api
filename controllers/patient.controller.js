const catchAsync = require("../utils/catchAsync");
const Patient = require("../models/patient.model");
const Contact = require("../models/contact.model");
const ContactType = require("../models/contact-type.model");

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
    const patient = await Patient.findById(id).populate("department diagnosis");

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

        contactType = await ContactType.create({
            name,
            description,
        });

        contactType.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Contact Type added successfull.`,
            contactType,
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
};
