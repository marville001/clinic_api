const Joi = require("joi");

module.exports = {
  createPatientSchema: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().allow(""),
    dob: Joi.string().required(),
    type: Joi.string().required(),
    gender: Joi.string().required(),
    department: Joi.string().required(),
    address: Joi.string().required(),
    // contact: Joi.array().required(),
    // comment: Joi.array().required(),
    diagnosis: Joi.array()
      .required()
      .error((errors) => {
        errors.forEach((err) => {
          switch (err.code) {
            case "array.empty":
              err.message = "Diagnosis is required!";
              break;
            default:
              break;
          }
        });
        return errors;
      }),

  }),

  updatePatientSchema: Joi.object().keys({
    firstname: Joi.string().allow(""),
    lastname: Joi.string().allow(""),
    phone: Joi.string().allow(""),
    email: Joi.string().email().allow(""),
    dob: Joi.string().allow(""),
    type: Joi.string().allow(""),
    gender: Joi.string().allow(""),
    department: Joi.string().allow(""),
    address: Joi.string().allow(""),
    diagnosis: Joi.array().allow(),
    contact: Joi.array().allow(),
    comment: Joi.array().allow(),

  }),

  addFileSchema: Joi.object().keys({
        name: Joi.string().allow(""),
        description: Joi.string().allow(""),
    }),
};
