const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, refPath: "model_type" },
        content: { type: String, trim: true },
        chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
        readBy: [
            { type: mongoose.Schema.Types.ObjectId, refPath: "model_type" },
        ],
        model_type: {
            type: String,
            enum: ["Admin", "Secretary", "Doctor"],
            required: true,
        },
    },
    { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
