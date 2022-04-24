const catchAsync = require("../utils/catchAsync");
const Department = require("../models/department.model");

module.exports = {
    createDepartmentController: catchAsync(async (req, res) => {
        const { name, description } = req.body;

        let department = await Department.findOne({ name });
        if (department)
            return res
                .status(400)
                .send({
                    success: false,
                    message: "Department with given name exists",
                });

        department = await Department.create({
            name,
            description,
        });

        department.save({ validateBeforeSave: false });

        res.status(200).json({
            success: true,
            message: `Department added successfull.`,
            department,
        });
    }),

    getDepartmentsController: catchAsync(async (req, res) => {
        const departments = await Department.find();

        res.status(200).json({
            success: true,
            message: `Successfull.`,
            departments,
        });
    }),
    deleteDepartmentController: catchAsync(async (req, res) => {
        const { id } = req.params;

        const department = await Department.findById(id);
        if (!department)
            return res
                .status(404)
                .send({ success: false, message: "Department does not exist" });

        await Department.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: `Deleted Successfull.`,
        });
    }),
};
