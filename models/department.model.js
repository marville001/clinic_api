const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
