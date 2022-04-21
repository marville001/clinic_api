const Joi = require("joi");

module.exports = {
    createDepartmentSchema: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }),

    updateDepartmentSchema: Joi.object().keys({
        name: Joi.string().allow(""),
        description: Joi.string().allow(""),
    }),
};
