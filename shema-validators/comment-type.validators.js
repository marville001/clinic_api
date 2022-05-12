const Joi = require("joi");

module.exports = {
    createCommentTypeSchema: Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
    }),

    updateCommentTypeSchema: Joi.object().keys({
        name: Joi.string().allow(""),
        description: Joi.string().allow(""),
    }),
};
