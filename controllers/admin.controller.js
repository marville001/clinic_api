const Login = require("../models/login.model");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
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

        const token = await signToken({ _id: user._id, role: "admin", email });

        res.status(200).json({
            success: true,
            message: `Registration successfull.`,
            user: _.pick(user, [
                "_id",
                "firstname",
                "lastname",
                "email",
                "username",
                "role",
                "createdAt",
            ]),
            token,
        });
    }),
    getAdminController: catchAsync(async (req, res) => {
        res.send("Get Admin");
    }),
    getAdminsController: catchAsync(async (req, res) => {
        res.send("Get Admins");
    }),
    updateAdminController: catchAsync(async (req, res) => {
        res.send("Update Admin");
    }),
    deleteAdminController: catchAsync(async (req, res) => {
        res.send("Update Admin");
    }),
};
