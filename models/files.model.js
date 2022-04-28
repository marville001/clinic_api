const mongoose = require("mongoose");

const filesSchema = new mongoose.Schema({
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
    size: {
        type: Number,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const File = mongoose.model("File", filesSchema);
module.exports = File;
