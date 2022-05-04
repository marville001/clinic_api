const catchAsync = require("../utils/catchAsync");
const Chat = require("../models/chat.model");
const Secretary = require("../models/secretary.model");
const Doctor = require("../models/doctor.model");
const Admin = require("../models/admin.model");
const Message = require("../models/message.model");

module.exports = {
    fetchMessagesController: catchAsync(async (req, res) => {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "firstname lastname username email")
            .populate("chat");
        res.json(messages);
    }),
    sendMessageController: catchAsync(async (req, res) => {
        const { content, chatId } = req.body;
        const { role } = req.user;

        if (!content || !chatId)
            return res.status(400).send({
                success: false,
                message: "content and chatId are required",
            });

        const newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
            model_type:
                role === "doctor"
                    ? "Doctor"
                    : role === "admin"
                    ? "Admin"
                    : "Secretary",
        };

        let message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });

        res.json(message);
    }),
};
