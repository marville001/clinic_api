const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        default: "",
    },

    dob: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        enum: ["active", "inactive", "not-subscribed"],
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
    },
    address: {
        type: String,
        required: true,
    },
    diagnosis: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Diagnosis",
        required: true,
    },
    files: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "File",
        default: [],
    },
    doctors: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Doctor",
        default: [],
    },
    comment: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Comment",
        default: [],
    },
    contact: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Contact",
        default: [],
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
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
