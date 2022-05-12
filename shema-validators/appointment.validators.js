const Joi = require("joi");

module.exports = {
    createAppointmentSchema: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        doctorId: Joi.string().required(),
        allDay: Joi.boolean().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().allow(""),
        timeFrom: Joi.string().allow(""),
        timeTo: Joi.string().allow(""),
    }),

    updateAppointmentSchema: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        doctorId: Joi.string().required(),
        allDay: Joi.boolean().required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().allow(""),
        timeFrom: Joi.string().allow(""),
        timeTo: Joi.string().allow(""),
    }),
};
