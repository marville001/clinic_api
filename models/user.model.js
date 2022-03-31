const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please tell us your name!"],
        trim: true,
        maxlength: [20, "must be less than or equal to 20"],
        minlength: [3, "must be greater than 3"],
    },
    lastname: {
        type: String,
        required: [true, "Please tell us your name!"],
        trim: true,
        maxlength: [20, "must be less than or equal to 20"],
        minlength: [3, "must be greater than 3"],
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: [true, "Please provide your username"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["secretary", "admin", "doctor"],
        required: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [8, "must be greater than 8"],
        select: false,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, email: this.email, role: this.role },
        JWT_SECRET,
        { expiresIn: "24h" }
    );
    return token;
};

// comparing password
userSchema.methods.correctPassword = async function (
    candidate_Password,
    user_Password
) {
    return await bcrypt.compare(candidate_Password, user_Password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
