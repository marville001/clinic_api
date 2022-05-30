const router = require("express").Router();

const doctorController = require("../controllers/doctor.controller");
const {
  addDoctorController,
  getAllDoctorsController,
  getDoctorController,
  updateDoctorController,
  deleteDoctorController,
  searchDoctorController,
  makeDoctorAdminController,
  revokeDoctorAdminController,
} = require("../controllers/doctor.controller");

const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { addDoctorSc } = require("../shema-validators/doctor.validators");

router.get("/", auth, getAllDoctorsController);
router.post("/", auth, schemaValidator(addDoctorSc, "body"), addDoctorController);
router.get("/search", auth, searchDoctorController);
router.get("/:id", auth, getDoctorController);
router.put("/:id/make-admin", auth, makeDoctorAdminController);
router.put("/:id/revoke-admin", auth, revokeDoctorAdminController);
router.put("/:id", auth, updateDoctorController);
router.delete("/:id", auth, deleteDoctorController);

module.exports = router;
