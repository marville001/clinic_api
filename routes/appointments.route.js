const router = require("express").Router();

const { getAppointmentsController, createAppointmentController, updateAppointmentController, deleteAppointmentController } = require("../controllers/appointments.controller");

const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { createAppointmentSchema, updateAppointmentSchema } = require("../shema-validators/appointment.validators");

router.get("/latest", auth, getLatestAppointmentsController);
router.get("/:id", auth, getAppointmentsController);
router.post("/", auth, schemaValidator(createAppointmentSchema, "body"),  createAppointmentController);
router.put("/:id", auth, schemaValidator(updateAppointmentSchema, "body"), updateAppointmentController);
router.delete("/:id", auth, deleteAppointmentController);

module.exports = router;
