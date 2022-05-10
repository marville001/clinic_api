const mongoose = require("mongoose");

const commentTypeSchema = new mongoose.Schema({
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

const CommentType = mongoose.model("CommentType", commentTypeSchema);
module.exports = CommentType;
