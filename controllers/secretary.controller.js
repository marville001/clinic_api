const Login = require("../models/login.model");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Secretary = require("../models/secretary.model");

module.exports = {
    createSecretaryController: catchAsync(async (req, res) => {
        const {
            firstname,
            lastname,
            dob,
            gender,
            phone,
            address,
            username,
            email,
            password,
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
            role: "secretary",
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        user.save({ validateBeforeSave: false });

        user = await Secretary.create({
            firstname,
            lastname,
            username,
            email,
            dob,
            gender,
            phone,
            address,
        });
        user.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Secretary added successfull.`,
            user: _.pick(user, [
                "_id",
                "firstname",
                "lastname",
                "email",
                "username",
                "role",
                "dob",
                "phone",
                "gender",
                "address",
                "createdAt",
            ]),
        });
    }),

    getSecretaryController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const secretary = await Secretary.findById(id);

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            secretary,
        });
    }),

    getSecretariesController: catchAsync(async (req, res) => {
        const search = req.query.search || "";
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(search);
        const secretaries = await Secretary.find({
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
            secretaries,
        });
    }),

    updateSecretaryController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let secretary = await Secretary.findById(id);

        if (!secretary)
            return res
                .status(400)
                .send({ success: false, message: "Invalid Secretary Id" });

        secretary = await Secretary.findByIdAndUpdate(
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
            secretary,
        });
    }),

    deleteSecretaryController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const secretary = await Secretary.findById(id);
        if (!secretary)
            return res
                .status(404)
                .send({ success: false, message: "Account does not exist" });

        await Secretary.findByIdAndDelete(id);
        await Login.where({ email: secretary.email }).deleteOne();

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),

    searchSecretaryController: catchAsync(async (req, res) => {
        const search = req.query.search || "";

        if (search === "")
            return res.status(200).json({
                success: true,
                message: `Successfull.`,
                results: [],
            });

        // Pattern
        const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
        const searchRgx = rgx(search);

        const results = await Secretary.find({
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
