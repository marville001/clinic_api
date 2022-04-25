const Doctor = require("../models/doctor.model");
const catchAsync = require("../utils/catchAsync");
const Login = require("../models/login.model");

module.exports = {
  addDoctorController: catchAsync(async (req, res) => {
    console.log("joan");
    const { email, username } = req.body;
    console.log(req.body);
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
    const doctor = await Doctor.findById(id).populate("department");
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
