const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config");

module.exports = function (req, res, next) {
    const bearerHeader = req.headers["authorization"];

    console.log({ headers: req.headers, bearerHeader });

    if (typeof bearerHeader === "undefined")
        return res.status(401).send({
            success: false,
            message: "Access denied. No token provided",
        });

    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        next();
    } catch (ex) {
        console.log(ex);
        res.status(400).send({ success: false, message: "Invalid token" });
    }
};
