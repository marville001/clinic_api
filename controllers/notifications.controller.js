const catchAsync = require("../utils/catchAsync");

const Notification = require("../models/notifications.model");

module.exports = {
    fetchNotificationsController: catchAsync(async (req, res) => {
        const limit = req.query.limit ?? 10;
        let notifications = await Notification.find(
            { userId: req.params.id },
            {},
            { limit }
        ).sort([["createdAt", -1]]);

        res.status(200).send({
            message: "Successfull",
            success: true,
            notifications,
        });
    }),

    updateNotificationsController: catchAsync(async (req, res) => {
        let notifications = await Notification.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).send({
            message: "Successfull",
            success: true,
            notifications,
        });
    }),
};
