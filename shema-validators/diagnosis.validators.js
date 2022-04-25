const Joi = require("joi");

module.exports = {
    createDiagnosisSchema: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }),

    updateDiagnosisSchema: Joi.object().keys({
        name: Joi.string().allow(""),
        description: Joi.string().allow(""),
    }),
};
