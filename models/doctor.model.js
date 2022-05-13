const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
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
        enum: ["male", "female", "other"],
        required: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    patients: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Patient",
        default: [],
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: String,
        required: true,
        trim: true,
    },
    bio: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        default: "doctor",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
