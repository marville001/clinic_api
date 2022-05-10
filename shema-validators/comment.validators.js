const Joi = require("joi");

module.exports = {
  createCommentSchema: Joi.object().keys({
    commenttype: Joi.string().required(),
    patientId: Joi.string().required(),
    senderRole: Joi.string().required(),
    senderId: Joi.string().required(),
    comment: Joi.string().required(),
  
  }),

  updateCommentSchema: Joi.object().keys({
    commenttype: Joi.string().allow(""),
    patientId: Joi.string().allow(""),
    senderRole: Joi.string().allow(""),
    senderId: Joi.string().allow(""),
    comment: Joi.string().allow(""),
   
  }),
};
