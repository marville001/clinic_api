const router = require("express").Router();

const { getPatientsController, getPatientController, createPatientController, updatePatientController, deletePatientController } = require("../controllers/patient.controller");
const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { createPatientSchema, updatePatientSchema } = require("../shema-validators/patient.validators");

router.get("/", auth, getPatientsController);
router.get("/:id", auth, getPatientController);
router.post("/", auth,  schemaValidator(createPatientSchema, "body"), createPatientController);
router.put("/:id", auth,  schemaValidator(updatePatientSchema, "body"), updatePatientController);
router.delete("/:id", auth, deletePatientController);

module.exports = router;
