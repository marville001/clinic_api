module.exports = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    });
};
