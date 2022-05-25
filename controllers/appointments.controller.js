const Appointment = require("../models/appointment.model");
const catchAsync = require("../utils/catchAsync");

module.exports = {
    createAppointmentController: catchAsync(async (req, res) => {
        const appointment = await Appointment.create(req.body);

        appointment.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Appointment added successfull.`,
            appointment,
        });
    }),

    getAppointmentsController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const appointments = await Appointment.find({doctorId: id}).sort([["createdAt", -1]]);

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            appointments,
        });
    }),
};
