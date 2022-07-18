const Joi = require("joi");

module.exports = {
    createSecretarySchema: Joi.object().keys({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        gender: Joi.string().required(),
        dob: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        username: Joi.string().min(5).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }),

    updateSecretarySchema: Joi.object().keys({
        firstname: Joi.string().allow(""),
        lastname: Joi.string().allow(""),
        gender: Joi.string().allow(""),
        dob: Joi.string().allow(""),
        phone: Joi.string().allow(""),
        address: Joi.string().allow(""),
        username: Joi.string().min(5).max(20).allow(""),
        email: Joi.string().email().allow(""),
        password: Joi.string().min(8).allow(""),
        status: Joi.string().allow(""),
    }),
};
