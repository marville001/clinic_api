const mongoose = require("mongoose");

const secreatarySchema = new mongoose.Schema({
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
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
    },
    dob: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "secretary",
    },
    avatar: {
        type: String,
        default:
            "https://www.kindpng.com/picc/m/207-2074624_white-gray-circle-avatar-png-transparent-png.png",
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
});

const Secretary = mongoose.model("Secretary", secreatarySchema);
module.exports = Secretary;
