const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    doctorId: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        default: "",
    },
    endDate: {
        type: Date,
        default: "",
    },
    timeFrom: {
        type: String,
        default: "",
    },
    timeTo: {
        type: String,
        default: "",
    },
    allDay: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
