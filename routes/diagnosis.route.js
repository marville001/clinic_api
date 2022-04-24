const router = require("express").Router();

const { getDiagnosisController, createDiagnosisController, deleteDiagnosisController } = require("../controllers/diagnosis.controller");
const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { createDiagnosisSchema } = require("../shema-validators/diagnosis.validators");

router.get("/", getDiagnosisController);
router.post("/", auth,  schemaValidator(createDiagnosisSchema, "body"), createDiagnosisController);
router.delete("/:id", auth, deleteDiagnosisController);

module.exports = router;
