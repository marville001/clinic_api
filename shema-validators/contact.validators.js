const Joi = require("joi");

module.exports = {
  createContactSchema: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    contacttype: Joi.string().required(),
    email: Joi.string().email().allow(""),
    availability: Joi.string().required(),
    address: Joi.string().required(),
    phone: Joi.array().required(),
  }),

  //   updatePatientSchema: Joi.object().keys({
  //     firstname: Joi.string().allow(""),
  //     lastname: Joi.string().allow(""),
  //     phone: Joi.string().allow(""),
  //     email: Joi.string().email().allow(""),
  //     dob: Joi.string().allow(""),
  //     type: Joi.string().allow(""),
  //     gender: Joi.string().allow(""),
  //     department: Joi.string().allow(""),
  //     address: Joi.string().allow(""),
  //     diagnosis: Joi.array().allow(),
  //   }),
};
