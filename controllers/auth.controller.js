const catchAsync = require("../utils/catchAsync");

module.exports = {
    getUserDetailsController: catchAsync(async (req, res) => {
        res.send("Details");
    }),
    loginController: catchAsync(async (req, res) => {
        res.send("Login");
    }),
};
