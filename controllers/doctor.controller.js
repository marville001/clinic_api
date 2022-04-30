const Doctor = require("../models/doctor.model");
const catchAsync = require("../utils/catchAsync");
const Login = require("../models/login.model");
const bcrypt = require("bcrypt");

module.exports = {
  addDoctorController: catchAsync(async (req, res) => {
    const { email, username } = req.body;
    const { password, ...details } = req.body;
    let doctor = await Doctor.findOne({ email });
    if (doctor) res.status(400).send({ error: "Email already added" });

    doctor = await Doctor.findOne({ username });
    if (doctor) res.status(400).send({ error: "Username already added" });

    doctor = await Login.create({
      username,
      email,
      password,
      role: "doctor",
    });
    const salt = await bcrypt.genSalt(10);

    doctor.password = await bcrypt.hash(doctor.password, salt);

    doctor.save({ validateBeforeSave: false });

    doctor = await Doctor.create(details);

    await doctor.save({ validateBeforeSave: true });

    res.status(200).json({
      success: true,
      message: `Doctor Added Successfull.`,
      doctor,
    });
  }),

  getAllDoctorsController: catchAsync(async (req, res) => {
    let doctors = await Doctor.find();
    res.status(200).json({
      success: true,
      message: `Successfull.`,
      doctors,
    });
  }),

  getDoctorController: catchAsync(async (req, res) => {
    let { id } = req.params;
    const doctor = await Doctor.findById(id).populate("department patients");
    res.status(200).json({
      success: true,
      message: `Successfull.`,
      doctor,
    });
  }),

  updateDoctorController: catchAsync(async (req, res) => {
    let { id } = req.params;
    let doctor = await Doctor.findById(id);

    if (!doctor)
      return res
        .status(400)
        .send({ success: false, message: "Invalid doctor Id" });

    let {
      firstname,
      lastname,
      email,
      username,
      gender,
      department,
      phone,
      dob,
      bio,
      address,
    } = req.body;
    const query = await Doctor.where({ _id: id }).updateMany({
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      gender: gender,
      department: department,
      phone: phone,
      dob: dob,
      bio: bio,
      address,
    });
    res.status(200).json({
      success: true,
      message: `Successfull.`,
      query,
    });
  }),

  deleteDoctorController: catchAsync(async (req, res) => {
    let { id } = req.params;

    let doctor = await Doctor.findById(id);

    if (!doctor)
      return res
        .status(400)
        .send({ success: false, message: "Invalid doctor Id" });

    await Doctor.findByIdAndDelete(id);

    await Login.where({ email: doctor.email }).deleteOne();
    res.status(200).json({ succcess: true, message: "successful" });
  }),
};
