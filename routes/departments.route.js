const router = require("express").Router();

const { createADepartmentController, getDepartmentsController, deleteDepartmentController } = require("../controllers/departments.controller");
const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { createDepartmentSchema } = require("../shema-validators/department.validators");

router.get("/", auth, getDepartmentsController);
router.post("/", auth,  schemaValidator(createDepartmentSchema, "body"), createADepartmentController);
router.delete("/:id", auth, deleteDepartmentController);

module.exports = router;
