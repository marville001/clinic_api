const router = require("express").Router();

const { getAdminsController, createAdminController, updateAdminController, getAdminController, deleteAdminController, searchAdminController } = require("../controllers/admin.controller");

const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { updateAdminSchema, createAdminSchema } = require("../shema-validators/admin.validators");

router.get("/", auth, getAdminsController);
router.get("/search", auth, searchAdminController);
router.get("/:id", auth, getAdminController);
router.post("/", auth,  schemaValidator(createAdminSchema, "body"), createAdminController);
router.put("/:id", auth,  schemaValidator(updateAdminSchema, "body"), updateAdminController);
router.delete("/:id", auth, deleteAdminController);

module.exports = router;
