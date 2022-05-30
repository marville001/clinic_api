const catchAsync = require("../utils/catchAsync");

const Notification = require("../models/notifications.model");

module.exports = {
    fetchNotificationsController: catchAsync(async (req, res) => {
        let notifications = await Notification.find({ userId: req.params.chatId })

        res.status(200).send({
            message: "Successfull",
            success: true,
            notifications,
        });
    })
};
