const mongoose = require("mongoose");

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
        default: "admin",
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
