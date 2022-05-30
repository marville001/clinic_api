const router = require("express").Router();

const { getAppointmentsController, createAppointmentController, updateAppointmentController } = require("../controllers/appointments.controller");

const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { createAppointmentSchema, updateAppointmentSchema } = require("../shema-validators/appointment.validators");

router.get("/:id", auth, getAppointmentsController);
router.post("/", auth, schemaValidator(updateAppointmentSchema, "body"),  createAppointmentController);
router.put("/:id", auth, schemaValidator(createAppointmentSchema, "body"), updateAppointmentController);

module.exports = router;
