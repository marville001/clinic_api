const _ = require("lodash");
const Doctor = require("../models/doctor.model ");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    addDoctorController: catchAsync(async (req, res) => {
        const { email, username } = req.body;
        let doctor = await Doctor.findOne({ email });
        if (doctor) res.status(400).send({ error: "Email already added" });

        doctor = await Doctor.findOne({ username });
        if (doctor) res.status(400).send({ error: "Username already added" });

        doctor = await Doctor.create(req.body);

        await doctor.save({ validateBeforeSave: true });

        res.status(200).json({
            success: true,
            message: `Doctor Added Successfull.`,
            doctor,
        });
    }),
    getAllDoctorsController: catchAsync(async (req, res) => {
        let doctors = await Doctor.find();
        res.status(200).json({
            success: true,
            message: `Successfull.`,
            doctors,
        });
    }),
};
