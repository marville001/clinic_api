const mongoose = require("mongoose");

const contactTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: String,
        default: Date.now(),
    },
});

const ContactType = mongoose.model("ContactType", contactTypeSchema);
module.exports = ContactType;
