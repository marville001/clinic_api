const Joi = require("joi");

module.exports = {
    createAdminSchema: Joi.object().keys({
        firstname: Joi.string().min(3).max(20).required(),
        lastname: Joi.string().min(3).max(20).required(),
        username: Joi.string().min(5).max(20).required(),
        email: Joi.string().email().required(),
        gender: Joi.string().required(),
        dob: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.string().required(),
        password: Joi.string().min(8).required(),
    }),

    updateAdminSchema: Joi.object().keys({
        firstname: Joi.string().min(3).max(20).allow(""),
        lastname: Joi.string().min(3).max(20).allow(""),
        username: Joi.string().min(5).max(20).allow(""),
        email: Joi.string().email().allow(""),
        gender: Joi.string().allow(""),
        dob: Joi.string().allow(""),
        phone: Joi.string().allow(""),
        address: Joi.string().allow(""),
        password: Joi.string().min(8).allow(""),
    }),
};
