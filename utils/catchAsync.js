module.exports = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.log(error.message);
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    });
};
