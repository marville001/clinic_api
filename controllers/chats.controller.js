const catchAsync = require("../utils/catchAsync");
const Chat = require("../models/chat.model");
const Secretary = require("../models/secretary.model");
const Doctor = require("../models/doctor.model");
const Admin = require("../models/admin.model");

module.exports = {
    createOrFetchChatController: catchAsync(async (req, res) => {
        const { role, _id } = req.user;
        const { userId } = req.body;

        if (!userId)
            return res
                .status(400)
                .send({ success: false, message: "UserId is required" });

        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: _id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        })
            .populate("users")
            .populate("latestMessage");

        if (role === "admin") {
            isChat = await Admin.populate(isChat, {
                path: "latestMessage.sender",
                select: "firstname lastname username email",
            });
        } else if (role === "doctor") {
            isChat = await Doctor.populate(isChat, {
                path: "latestMessage.sender",
                select: "firstname lastname username email",
            });
        } else if (role === "secretary") {
            isChat = await Secretary.populate(isChat, {
                path: "latestMessage.sender",
                select: "firstname lastname username email",
            });
        }

        if (isChat.length > 0) {
            res.send({
                message: "Successfull",
                success: true,
                chat: isChat[0],
            });
            return;
        }

        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
            model_type:
                role === "doctor"
                    ? "Doctor"
                    : role === "admin"
                    ? "Admin"
                    : "Secretary",
        };

        const createdChat = await Chat.create(chatData);

        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
            "users"
        );
        res.status(200).json({
            message: "Successfull",
            success: true,
            chat: fullChat,
        });
    }),

    fetchAllChatsController: catchAsync(async (req, res) => {
        const { role } = req.user;
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (results) => {
                if (role === "admin") {
                    results = await Admin.populate(results, {
                        path: "latestMessage.sender",
                        select: "firstname lastname username email",
                    });
                } else if (role === "doctor") {
                    results = await Doctor.populate(results, {
                        path: "latestMessage.sender",
                        select: "firstname lastname username email",
                    });
                } else if (role === "secretary") {
                    results = await Secretary.populate(results, {
                        path: "latestMessage.sender",
                        select: "firstname lastname username email",
                    });
                }
                res.status(200).send({
                    message: "Successfull",
                    success: true,
                    chats: results,
                });
            });
    }),
};
