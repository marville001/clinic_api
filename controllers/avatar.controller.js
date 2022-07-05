const Admin = require("../models/admin.model");
const Doctor = require("../models/doctor.model");
const Secretary = require("../models/secretary.model");
const catchAsync = require("../utils/catchAsync");

const crypto = require("crypto");

module.exports = {
    uploadAvatar: catchAsync(async (req, res) => {
        const { id } = req.params;
        if (!req.body.role)
            return res
                .status(404)
                .send({ success: false, message: "User role is required" });

        if (!req.files || !req.files.avatar)
            return res
                .status("400")
                .send({ success: false, message: "No Avatar selected" });

        let user;
        if (req.body.role === "admin") {
            user = await Admin.findById(id);
        } else if (req.body.role === "doctor") {
            user = await Doctor.findById(id);
        } else if (req.body.role === "secretary") {
            user = await Secretary.findById(id);
        } else {
            user = null;
        }

        if (!user)
            return res.status(404).send({
                success: false,
                message: "User with given id not found",
            });

        const { avatar } = req.files;

        const fileId = crypto.randomBytes(8).toString("hex");
        const imageLink = `${fileId + "_" + avatar.name}`;
        avatar.mv(`uploads/${imageLink}`);

        user.avatar = imageLink;
        await user.save();

        return imageLink;
    }),
};
