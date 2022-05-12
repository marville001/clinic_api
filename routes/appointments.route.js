const router = require("express").Router();

const { getAppointmentsController, createAppointmentController } = require("../controllers/appointments.controller");

const auth = require("../middlewares/auth");
const schemaValidator = require("../middlewares/schemaValidator");
const { createAppointmentSchema } = require("../shema-validators/appointment.validators");

router.get("/:id", auth, getAppointmentsController);
router.post("/", auth, schemaValidator(createAppointmentSchema, "body"),  createAppointmentController);

module.exports = router;
