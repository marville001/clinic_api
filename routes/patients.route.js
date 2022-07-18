const router = require("express").Router();

const { getPatientsController, getPatientController, createPatientController, updatePatientController, deletePatientController, createContactTypeController, getContactTypesController, createContactController, deleteContactTypeController, addPatietFileController, assignPatientController, unAssignPatientController, createCommentTypeController, getCommentTypesController, deleteCommentTypeController, updateCommentTypeController, createCommentController, getCommentsController, updateCommentController, deleteCommentController, deleteContactController, updateContactController } = require("../controllers/patient.controller");
const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { createCommentTypeSchema, updateCommentTypeSchema } = require("../shema-validators/comment-type.validators");
const { createCommentSchema, updateCommentSchema } = require("../shema-validators/comment.validators");
const { createContactTypeSchema } = require("../shema-validators/contact-type.validators");
const { createContactSchema, updateContactSchema } = require("../shema-validators/contact.validators");
const { createPatientSchema, updatePatientSchema, addFileSchema } = require("../shema-validators/patient.validators");

//Comment Type
router.post("/comment-type", auth, schemaValidator(createCommentTypeSchema, "body"), createCommentTypeController);
router.get("/comment-type", auth, getCommentTypesController);
router.delete("/comment-type/:id", auth, deleteCommentTypeController);
router.put("/comment-type/:id", auth, schemaValidator(updateCommentTypeSchema, "body"), updateCommentTypeController);

// Comment
router.post("/comment/:id", auth, schemaValidator(createCommentSchema, "body"), createCommentController);
router.put("/comment/:id", auth, schemaValidator(updateCommentSchema, "body"), updateCommentController);
router.delete("/comment/:id", auth, deleteCommentController);
router.get("/comment/:pid", auth, getCommentsController);


// Contact Type
router.get("/contact-type", auth, getContactTypesController);
router.post("/contact-type", auth, schemaValidator(createContactTypeSchema, "body"), createContactTypeController);
router.delete("/contact-type/:id", auth, deleteContactTypeController);

//contact

router.post("/contact/:id", auth, schemaValidator(createContactSchema, "body"), createContactController );
router.put("/contact/:pid/:cid", auth, schemaValidator(updateContactSchema, "body"), updateContactController );
router.delete("/contact/:id", auth, deleteContactController);

//Files
router.post("/files/:id", auth, schemaValidator(addFileSchema, "body"), addPatietFileController);

//Assign doctor
router.put("/assign-doctor/:pid/:did", auth, assignPatientController);
router.put("/un-assign-doctor/:pid/:did", auth, unAssignPatientController);


// Patient
router.get("/", auth, getPatientsController);
router.get("/:id", auth, getPatientController);
router.post("/", auth, schemaValidator(createPatientSchema, "body"), createPatientController);
router.put("/:id", auth, schemaValidator(updatePatientSchema, "body"), updatePatientController);
router.delete("/:id", auth, deletePatientController);




module.exports = router;
