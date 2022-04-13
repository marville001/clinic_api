const router = require("express").Router();

const {
    addDoctorController, getAllDoctorsController
} = require("../controllers/doctor.controller");

const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const {
    addDoctorSc
} = require("../shema-validators/doctor.validators");

router.get("/", getAllDoctorsController);
router.post("/", schemaValidator(addDoctorSc, "body"), addDoctorController);


module.exports = router;
