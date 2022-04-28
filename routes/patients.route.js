const router = require("express").Router();

const { getPatientsController, getPatientController, createPatientController, updatePatientController, deletePatientController, createContactTypeController, getContactTypesController, createContactController, deleteContactTypeController, addPatietFileController } = require("../controllers/patient.controller");
const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { createContactTypeSchema } = require("../shema-validators/contact-type.validators");
const { createContactSchema } = require("../shema-validators/contact.validators");
const { createPatientSchema, updatePatientSchema, addFileSchema } = require("../shema-validators/patient.validators");


// Contact Type
router.get("/contact-type", auth, getContactTypesController);
router.post("/contact-type", auth, schemaValidator(createContactTypeSchema, "body"), createContactTypeController);
router.delete("/contact-type/:id", auth, deleteContactTypeController);

//Files
router.post("/files/:id", auth, schemaValidator(addFileSchema, "body"), addPatietFileController);


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
