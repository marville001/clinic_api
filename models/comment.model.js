const mongoose = require("mongoose");
const Admin = require("./admin.model");
const Doctor = require("./doctor.model");
const Patient = require("./patient.model");

const commentSchema = new mongoose.Schema({
  commenttype: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "CommentType",
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Patient",  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Doctor",
  },
  senderRole: {
    type: String,
    enum: ["doctor", "patient","admin"],
    lowercase: true,
  },
  comment: {
    type: String,
    required: true,
  },

  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
