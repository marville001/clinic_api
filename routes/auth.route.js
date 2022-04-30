const router = require("express").Router();

const {
    loginController,
    getUserDetailsController,
    forgotPasswordController,
    resetPasswordController,
} = require("../controllers/auth.controller");

const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { loginSchema } = require("../shema-validators/auth.validators");

router.get("/me", auth, getUserDetailsController);
router.post("/login", schemaValidator(loginSchema, "body"), loginController);

router.post("/forgot-password", forgotPasswordController);
router.put("/reset-password/:token", resetPasswordController);

module.exports = router;
