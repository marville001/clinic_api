const catchAsync = require("../utils/catchAsync");
const Login = require("../models/login.model");
const signToken = require("../utils/signToken");
const Admin = require("../models/admin.model");
const Doctor = require("../models/doctor.model");
const Secretary = require("../models/secretary.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");

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
    forgotPasswordController: catchAsync(async (req, res) => {
        const { email } = req.body;
        if (!email)
            return res
                .status(400)
                .send({ success: false, message: "Please provide your email" });

        let user = await Login.findOne({
            $or: [{ email: email }, { username: email }],
        });
        if (!user)
            return res
                .status(400)
                .send({ success: false, message: "User not found" });

        // 3 Create Password Reset Token
        const resetToken = user.createPasswordResetToken();

        await user.save({ validateBeforeSave: false });

        const resetURL = `${process.env.APP_URL}reset-password/${resetToken}`;

        // Send email to create passowrd
        await sendEmail({
            to: user.email,
            from: process.env.FROM_EMAIL,
            subject: "Your Password reset link. (will expire in 20 minutes)",
            html: `
            <h2>Hello <strong> ${user.firstname}</strong></h2>
            </br>
            <a href="${resetURL}">Click here to reset your password</a>
            `,
        });

        res.status(200).json({
            success: true,
            message: `Forget password link successfully sent to your email : ${user.email}.`,
        });
    }),
    resetPasswordController: catchAsync(async (req, res) => {
        if (!req.body.password)
            return res
                .status(400)
                .send({
                    success: false,
                    message: "Please provide req.body.password",
                });

        if (req.body.password.length < 8)
            return res
                .status(400)
                .send({
                    success: false,
                    message: "Password should be more than 8 characters",
                });

        // 1 Find the  user based on Token
        const hashedToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        let user = await Login.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: {
                $gt: Date.now(),
            },
        });
        if (!user)
            return res.status(400).send({
                success: false,
                message: "Reset Password Link Invalid or Expired !",
            });

        const { password } = req.body;
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.passwordResetToken = null;
        user.passwordResetExpires = null;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password Reset Successfully. ",
        });
    }),
};
