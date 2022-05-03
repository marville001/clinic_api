const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                refPath: "model_type",
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        groupAdmin: { type: mongoose.Schema.Types.ObjectId, refPath: "model_type", },
        model_type: {
            type: String,
            enum: ["Admin", "Secretary", "Doctor"],
            required: true,
        },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
