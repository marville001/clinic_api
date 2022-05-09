const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
    {
        chatName: { type: String, trim: true },
        isGroupChat: { type: Boolean, default: false },
        users: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    refPath: "user_type",
                },
                user_type: {
                    type: String,
                    enum: ["Admin", "Secretary", "Doctor"],
                    required: true,
                },
            },
        ],
        latestMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        groupAdmin: {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: "admin_type",
            },
            admin_type: {
                type: String,
                enum: ["Admin", "Secretary", "Doctor"],
                required: true,
            },
        },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
