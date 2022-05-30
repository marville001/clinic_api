const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: Number,
        default: "",
    },
    read: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const Notification = mongoose.model("Notification", notificationsSchema);
module.exports = Notification;
