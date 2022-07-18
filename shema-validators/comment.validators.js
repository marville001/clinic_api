const Joi = require("joi");

module.exports = {
    createCommentSchema: Joi.object().keys({
        commenttype: Joi.string().required(),
        senderRole: Joi.string().required(),
        senderName: Joi.string().allow(""),
        senderId: Joi.string().required(),
        comment: Joi.string().required(),
        isReply: Joi.boolean().required(),
        replyTo: Joi.string().allow(""),
    }),

    updateCommentSchema: Joi.object().keys({
        commenttype: Joi.string().allow(""),
        senderRole: Joi.string().allow(""),
        senderName: Joi.string().allow(""),
        senderId: Joi.string().allow(""),
        comment: Joi.string().allow(""),
        isReply: Joi.boolean().required(),
        replyTo: Joi.string().allow(""),
    }),
};
