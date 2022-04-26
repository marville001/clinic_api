const catchAsync = require("../utils/catchAsync");
const Diagnosis = require("../models/disgnosis.model");

module.exports = {
    createDiagnosisController: catchAsync(async (req, res) => {
        const { name, description } = req.body;

        let diagnosis = await Diagnosis.findOne({ name });
        if (diagnosis)
            return res.status(400).send({
                success: false,
                message: "Diagnosis with given name exists",
            });

        diagnosis = await Diagnosis.create({
            name,
            description,
        });

        diagnosis.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Diagnosis added successfull.`,
            diagnosis,
        });
    }),

    getDiagnosisController: catchAsync(async (req, res) => {
        const diagnosis = await Diagnosis.find().sort([["createdAt", -1]]);

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            diagnosis,
        });
    }),
    deleteDiagnosisController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const diagnosis = await Diagnosis.findById(id);
        if (!diagnosis)
            return res
                .status(404)
                .send({ success: false, message: "Diagnosis does not exist" });

        await Diagnosis.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
