const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

const adminSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    role: {
        type: String,
        default: "admin"
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

// comparing password
adminSchema.methods.correctPassword = async function (
    pass,
    hash
) {
    return await bcrypt.compare(pass, hash);
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
