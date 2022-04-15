const catchAsync = require("../utils/catchAsync");

module.exports = {
    createAdminController: catchAsync(async (req, res) => {
        res.send("Create Admin");
    }),
    getAdminController: catchAsync(async (req, res) => {
        res.send("Get Admin");
    }),
    getAdminsController: catchAsync(async (req, res) => {
        res.send("Get Admins");
    }),
    updateAdminController: catchAsync(async (req, res) => {
        res.send("Update Admin");
    }),
    deleteAdminController: catchAsync(async (req, res) => {
        res.send("Update Admin");
    }),
};
