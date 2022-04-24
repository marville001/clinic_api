const Login = require("../models/login.model");
const catchAsync = require("../utils/catchAsync");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const Patient = require("../models/patient.model");

module.exports = {
    createPatientController: catchAsync(async (req, res) => {
        const patient = await Patient.create(req.body);
        patient.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Patient added successfull.`,
            patient,
        });
    }),
    getPatientController: catchAsync(async (req, res) => {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            patient,
        });
    }),
    getPatientsController: catchAsync(async (req, res) => {
        const patients = await Patient.find().sort([["createdAt", -1]]);

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            patients,
        });
    }),
    updatePatientController: catchAsync(async (req, res) => {
        const { id } = req.params;
        let patient = await Patient.findById(id);

        if (!patient)
            return res
                .status(400)
                .send({ success: false, message: "Invalid Patient Id" });

        patient = await Patient.findByIdAndUpdate(
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
            patient,
        });
    }),
    deletePatientController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const patient = await Patient.findById(id);
        if (!patient)
            return res
                .status(404)
                .send({ success: false, message: "Patient not found" });

        await Patient.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
