const Login = require("../models/login.model");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Admin = require("../models/admin.model");
const signToken = require("../utils/signToken");

module.exports = {
    createAdminController: catchAsync(async (req, res) => {
        const { firstname, lastname, username, email, password } = req.body;
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
        const admins = await Admin.find().select("-password");

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            admins,
        });
    }),
    updateAdminController: catchAsync(async (req, res) => {
        res.send("Update Admin");
    }),
    deleteAdminController: catchAsync(async (req, res) => {
        const { id } = req.params;
        await Admin.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
