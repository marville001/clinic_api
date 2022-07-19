const Appointment = require("../models/appointment.model");
const Doctor = require("../models/doctor.model");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/sendEmail");

module.exports = {
    createAppointmentController: catchAsync(async (req, res) => {
        const appointment = await Appointment.create(req.body);

        appointment.save({ validateBeforeSave: false });

        const { doctorId } = req.body;

        let doctor = await Doctor.findById(doctorId);

        if (doctor) {
            sendEmail({
                to: doctor.email,
                from: process.env.FROM_EMAIL,
                subject: `New Appointment - ${appointment.title}`,
                html: `
                <h2>Hello <strong> ${doctor.firstname}</strong></h2>
                </br>
                <p>
                    You have a new appointment - <b>${appointment.title}</b>.
                </p>
                `,
            });
        }

        res.status(200).json({
            success: true,
            message: `Appointment added successfull.`,
            appointment,
        });
    }),

    getAppointmentsController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const appointments = await Appointment.find({ doctorId: id }).sort([
            ["createdAt", -1],
        ]);

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            appointments,
        });
    }),

    getAllAppointmentsController: catchAsync(async (req, res) => {
        const { doctors } = req.query;

        let docArray = [];

        if (typeof doctors === "object") {
            docArray = [...doctors];
        }
        if (typeof doctors === "string") {
            docArray = [doctors];
        }

        let where = {};

        if (docArray.length > 0) {
            where = {
                doctorId: { $in: docArray },
            };
        }

        console.log(docArray);

        const appointments = await Appointment.find(where).sort([
            ["createdAt", -1],
        ]);

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            appointments,
        });
    }),

    getLatestAppointmentsController: catchAsync(async (req, res) => {
        const appointments = await Appointment.find({}, {}, { limit: 6 }).sort([
            ["createdAt", -1],
        ]);

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            appointments,
        });
    }),

    updateAppointmentController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let appointment = await Appointment.findById(id);

        if (!appointment)
            return res
                .status(400)
                .send({ success: false, message: "Invalid Appointment Id" });

        appointment = await Appointment.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            appointment,
        });
    }),

    deleteAppointmentController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const appointment = await Appointment.findById(id);

        if (!appointment)
            return res.status(404).send({
                success: false,
                message: "Appointment does not exist",
            });

        await Appointment.findByIdAndDelete(id);

        let doctor = await Doctor.findById(appointment.doctorId);

        if (doctor) {
            sendEmail({
                to: doctor.email,
                from: process.env.FROM_EMAIL,
                subject: `Deleted Appointment - ${appointment.title}`,
                html: `
                <h2>Hello <strong> ${doctor.firstname}</strong></h2>
                </br>
                <p>
                    Your  - <b>${appointment.title}</b>, has been deleted.
                </p>
                `,
            });
        }

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
