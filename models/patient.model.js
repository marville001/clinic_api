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
        enum: ["active"],
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
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
