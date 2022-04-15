const Joi = require("joi");

module.exports = {
    createAdminSchema: Joi.object().keys({
        firstname: Joi.string().min(3).max(20).required(),
        lastname: Joi.string().min(3).max(20).required(),
        username: Joi.string().min(5).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }),

    updateAdminSchema: Joi.object().keys({
        firstname: Joi.string().min(3).max(20).allow(""),
        lastname: Joi.string().min(3).max(20).allow(""),
        username: Joi.string().min(5).max(20).allow(""),
        email: Joi.string().email().allow(""),
        password: Joi.string().min(8).allow(""),
    }),
};
