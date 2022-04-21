const router = require("express").Router();

const { getSecretariesController, getSecretaryController, createSecretaryController, updateSecretaryController, deleteSecretaryController } = require("../controllers/secretary.controller");

const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { createSecretarySchema, updateSecretarySchema } = require("../shema-validators/secretary.validators");

router.get("/", auth, getSecretariesController);
router.get("/:id", auth, getSecretaryController);
router.post("/", auth,  schemaValidator(createSecretarySchema, "body"), createSecretaryController);
router.put("/:id", auth,  schemaValidator(updateSecretarySchema, "body"), updateSecretaryController);
router.delete("/:id", auth, deleteSecretaryController);

module.exports = router;
