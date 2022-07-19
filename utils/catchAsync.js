module.exports = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        console.log(error);
        res.status(500).json({
            message: "An error occurred",
            error: "Internal Server Error",
            error: error.message,
        });
    });
};
