const router = require("express").Router();

const {
    loginController,
    getUserDetailsController,
} = require("../controllers/auth.controller");

const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { loginSchema } = require("../shema-validators/auth.validators");

router.get("/me", auth, getUserDetailsController);
router.post("/login", schemaValidator(loginSchema, "body"), loginController);

module.exports = router;
