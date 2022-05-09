const catchAsync = require("../utils/catchAsync");
const Chat = require("../models/chat.model");
const Secretary = require("../models/secretary.model");
const Doctor = require("../models/doctor.model");
const Admin = require("../models/admin.model");

module.exports = {
    createOrFetchChatController: catchAsync(async (req, res) => {
        const { role, _id } = req.user;
        const { userId, userRole } = req.body;

        if (!userId || !userRole)
            return res.status(400).send({
                success: false,
                message: "UserId and User Role is required",
            });

        let isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { "users.user": { $eq: _id } },
                { "users.user": { $eq: userId } },
            ],
        })
            .populate("users.user")
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

        const getRoleModel = (role) => {
            if (role === "secretary") return "Secretary";
            if (role === "doctor") return "Doctor";

            return "Admin";
        };

        let chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [
                {
                    user: req.user._id,
                    user_type: getRoleModel(role),
                },
                {
                    user: userId,
                    user_type: getRoleModel(userRole),
                },
            ],
            groupAdmin: {
                user: req.user._id,
                admin_type: getRoleModel(userRole),
            },
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
        const { role, _id } = req.user;
        Chat.find({ "users.user": { $eq: _id } })
            // .populate("users._id", "-password")
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

                const usersArray = await Promise.all(
                    results.map(async (result) => {
                        const resss = await Promise.all(
                            result.users.map(async (user) => {
                                if (user.user_type === "Admin")
                                    return await Admin.findOne({
                                        _id: user.user,
                                    });

                                if (user.user_type === "Doctor")
                                    return await Doctor.findOne({
                                        _id: user.user,
                                    });

                                if (user.user_type === "Secretary")
                                    return await Secretary.findOne({
                                        _id: user.user,
                                    });
                            })
                        );
                        return resss;
                    })
                ).then((users) => users);

                const finalResults = results.map((resu, idx) => {
                    const details = usersArray[idx].map((user) => {
                        return {
                            firstname: user.firstname,
                            lastname: user.lastname,
                            _id: user._id,
                            role: user.role,
                        };
                    });

                    return { ...resu._doc, users: details };
                });

                res.status(200).send({
                    message: "Successfull",
                    success: true,
                    chats: finalResults,
                });
            });
    }),
};
