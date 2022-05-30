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
        title: Joi.string().allow(""),
        description: Joi.string().allow(""),
        doctorId: Joi.string().allow(""),
        allDay: Joi.boolean().allow(""),
        startDate: Joi.date().allow(""),
        endDate: Joi.date().allow(""),
        timeFrom: Joi.string().allow(""),
        timeTo: Joi.string().allow(""),
    }),
};
