const Joi = require("joi");

module.exports = {
    loginSchema: Joi.object().keys({
        email_username: Joi.string()
            .required()
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.code) {
                        case "string.empty":
                            err.message = "Email or Username is required!";
                            break;
                        default:
                            break;
                    }
                });
                return errors;
            }),
        password: Joi.string().required(),
    }),
    registerSchema: Joi.object().keys({
        firstname: Joi.string().min(3).max(20).required(),
        lastname: Joi.string().min(3).max(20).required(),
        username: Joi.string().min(5).max(20).required(),
        role: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    }),
};
