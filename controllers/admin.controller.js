const Login = require("../models/login.model");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Admin = require("../models/admin.model");

module.exports = {
  createAdminController: catchAsync(async (req, res) => {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      gender,
      phone,
      address,
      dob,
    } = req.body;
    // Check if user email or username exists
    let user = await Login.findOne({ email });
    if (user)
      return res
        .status(400)
        .send({ success: false, message: "email already registered" });

    user = await Login.findOne({ username });
    if (user)
      return res.status(400).send({
        success: false,
        message: "username already registered. Try another username",
      });

    user = await Login.create({
      username,
      email,
      password,
      role: "admin",
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    user.save({ validateBeforeSave: false });

    user = await Admin.create({
      firstname,
      lastname,
      username,
      email,
      gender,
      phone,
      address,
      dob,
    });
    user.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: `Admin added successfull.`,
      user: _.pick(user, [
        "_id",
        "firstname",
        "lastname",
        "email",
        "username",
        "role",
        "createdAt",
      ]),
    });
  }),

  getAdminController: catchAsync(async (req, res) => {
    const { id } = req.params;
    const admin = await Admin.findById(id);

    res.status(200).json({
      success: true,
      message: `Successfull.`,
      admin,
    });
  }),

  getAdminsController: catchAsync(async (req, res) => {
    const search = req.query.search || "";
    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search);
    const admins = await Admin.find({
      $or: [
        {
          firstname: { $regex: searchRgx, $options: "i" },
        },
        {
          lastname: { $regex: searchRgx, $options: "i" },
        },
        {
          email: { $regex: searchRgx, $options: "i" },
        },
        {
          username: { $regex: searchRgx, $options: "i" },
        },
      ],
    }).select("-password");

    res.status(200).json({
      success: true,
      message: `Successfull.`,
      admins,
    });
  }),

  updateAdminController: catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(req.body);

    let admin = await Admin.findById(id);

    if (!admin)
      return res
        .status(400)
        .send({ success: false, message: "Invalid Admin Id" });

    admin = await Admin.findByIdAndUpdate(
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
      admin,
    });
  }),

  deleteAdminController: catchAsync(async (req, res) => {
    const { id } = req.params;

    const admin = await Admin.findById(id);
    if (!admin)
      return res
        .status(404)
        .send({ success: false, message: "Account does not exist" });

    await Admin.findByIdAndDelete(id);
    await Login.where({ email: admin.email }).deleteOne();

    res.status(200).json({
      success: true,
      message: `Deleted Successfull.`,
    });
  }),

  searchAdminController: catchAsync(async (req, res) => {
    const search = req.query.search || "";

    if (search === "")
      return res.status(200).json({
        success: true,
        message: `Successfull.`,
        results: [],
      });

    const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search);

    const results = await Admin.find({
      $or: [
        {
          firstname: { $regex: searchRgx, $options: "i" },
        },
        {
          lastname: { $regex: searchRgx, $options: "i" },
        },
        {
          email: { $regex: searchRgx, $options: "i" },
        },
        {
          username: { $regex: searchRgx, $options: "i" },
        },
      ],
    });
    res.status(200).json({
      success: true,
      message: `Successfull.`,
      results,
    });
  }),
};
