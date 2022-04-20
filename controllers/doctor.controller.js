const _ = require("lodash");
const Doctor = require("../models/doctor.model");
const catchAsync = require("../utils/catchAsync");

module.exports = {
  addDoctorController: catchAsync(async (req, res) => {
    const { email, username } = req.body;
    let doctor = await Doctor.findOne({ email });
    if (doctor) res.status(400).send({ error: "Email already added" });

    doctor = await Doctor.findOne({ username });
    if (doctor) res.status(400).send({ error: "Username already added" });

    doctor = await Doctor.create(req.body);

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
    const doctor = await Doctor.where({ _id: id });
    res.status(200).json({
      success: true,
      message: `Successfull.`,
      doctor,
    });
  }),
  updateDoctorController: catchAsync(async (req, res) => {
    let {
      id,
      firstname,
      lastname,
      email,
      username,
      gender,
      department,
      phone,
      dob,
      bio,
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
    });
    res.status(200).json({
      success: true,
      message: `Successfull.`,
      query,
    });
  }),
};
