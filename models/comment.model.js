const { string, boolean } = require("joi");
const mongoose = require("mongoose");
const Admin = require("./admin.model");
const Doctor = require("./doctor.model");
const Patient = require("./patient.model");

const commentSchema = new mongoose.Schema({
    commenttype: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentType",
        required: true,
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "sender_type",
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
    },
    senderRole: {
        type: String,
        required: true,
    },
    senderName: {
        type: String,
        default: "",
    },

    comment: {
        type: String,
        required: true,
    },
    isReply: {
        type: Boolean,
        default: false,
    },
    replyTo: {
        type: String,
        default: "",
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
    sender_type: {
        type: String,
        enum: ["Admin", "Secretary", "Doctor"],
        required: true,
    },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
