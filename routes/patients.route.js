const router = require("express").Router();

const { getPatientsController, getPatientController, createPatientController, updatePatientController, deletePatientController, createContactTypeController, getContactTypesController } = require("../controllers/patient.controller");
const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { createContactTypeSchema } = require("../shema-validators/contact-type.validators");
const { createPatientSchema, updatePatientSchema } = require("../shema-validators/patient.validators");


// Contact Type
router.get("/contact-type", auth, getContactTypesController);
router.post("/contact-type", auth, schemaValidator(createContactTypeSchema, "body"), createContactTypeController);


// Patient
router.get("/", auth, getPatientsController);
router.get("/:id", auth, getPatientController);
router.post(
  "/",
  auth,
  schemaValidator(createPatientSchema, "body"),
  createPatientController
);
router.put(
  "/:id",
  auth,
  schemaValidator(updatePatientSchema, "body"),
  updatePatientController
);
router.delete("/:id", auth, deletePatientController);
router.post(
  "/addcontact/:id",
  auth,
  schemaValidator(createContactSchema, "body"),
  createContactController
);



module.exports = router;
