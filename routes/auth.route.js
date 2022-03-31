const router = require("express").Router();

const {
    loginController,
    registerController,
    getUserDetails,
} = require("../controllers/auth.controller");

const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { loginSchema, registerSchema } = require("../shema-validators/auth.validators");

router.get("/me", auth, getUserDetails);
router.post("/login", schemaValidator(loginSchema, "body"), loginController);
router.post(
    "/register",
    schemaValidator(registerSchema, "body"),
    registerController
);

module.exports = router;
