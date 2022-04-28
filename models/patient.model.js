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
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
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
    contact: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Contact",
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
