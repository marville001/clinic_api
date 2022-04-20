const router = require("express").Router();

const doctorController = require("../controllers/doctor.controller");
const {
  addDoctorController,
  getAllDoctorsController,
  getDoctorController,
} = require("../controllers/doctor.controller");

const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { addDoctorSc } = require("../shema-validators/doctor.validators");

router.get("/", getAllDoctorsController);
router.post("/", schemaValidator(addDoctorSc, "body"), addDoctorController);
router.get("/doctor/:id", getDoctorController);

module.exports = router;
