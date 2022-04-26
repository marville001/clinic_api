const Joi = require("joi");

module.exports = {
  createContactSchema: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    contacttype: Joi.string().required(),
    email: Joi.string().email().required(),
    availability: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.array().required(),
  }),

  updateContactSchema: Joi.object().keys({
    firstname: Joi.string().allow(""),
    lastname: Joi.string().allow(""),
    contacttype: Joi.string().allow(""),
    email: Joi.string().email().allow(""),
    availability: Joi.string().allow(""),
    address: Joi.string().allow(""),
    phone: Joi.array().allow(),
  }),
};
