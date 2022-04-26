const Joi = require("joi");

module.exports = {
    createContactTypeSchema: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }),

    updateContactTypeSchema: Joi.object().keys({
        name: Joi.string().allow(""),
        description: Joi.string().allow(""),
    }),
};
