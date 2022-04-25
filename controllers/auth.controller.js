const catchAsync = require("../utils/catchAsync");
const Login = require("../models/login.model");
const signToken = require("../utils/signToken");
const Admin = require("../models/admin.model");
const Doctor = require("../models/doctor.model");
const Secretary = require("../models/secretary.model");
const bcrypt = require("bcrypt");

module.exports = {
  getUserDetailsController: catchAsync(async (req, res) => {
    const { role, _id } = req.user;
    let userDetails;


        if (role === "admin") {
            userDetails = await Admin.findById(_id);
        } else if (role === "doctor") {
            userDetails = await Doctor.findById(_id);
        } else if (role === "secretary") {
            userDetails = await Secretary.findById(_id);
        } else {
            userDetails: null;
        }


    const token = await signToken({ _id, role });

    res.status(200).json({
      success: true,
      message: `Login Successfull.`,
      user: userDetails,
      token,
    });
  }),
  loginController: catchAsync(async (req, res) => {
    const { email_username, password } = req.body;
    // Check if user email or username exists
    let user = await Login.findOne({
      $or: [{ email: email_username }, { username: email_username }],
    }).select("+password");
    if (!user)
      return res
        .status(400)
        .send({ success: false, message: "Invalid email or password" });

    let valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).send({
        success: false,
        message: "Invalid email or password...",
      });

    const { role } = user;
    let userDetails;

        if (role === "admin") {
            userDetails = await Admin.findOne({
                $or: [{ email: email_username }, { username: email_username }],
            });
        } else if (role === "doctor") {
            userDetails = await Doctor.findOne({
                $or: [{ email: email_username }, { username: email_username }],
            });
        } else if (role === "secretary") {
            userDetails = await Secretary.findOne({
                $or: [{ email: email_username }, { username: email_username }],
            });
        } else {
            userDetails: null;
        }

    const token = await signToken({ _id: userDetails._id, role });

    res.status(200).json({
      success: true,
      message: `Login Successfull.`,
      user: userDetails,
      token,
    });
  }),
};
