const Joi = require("joi");

module.exports = {
  addDoctorSc: Joi.object().keys({
    firstname: Joi.string().min(3).max(20).required(),
    lastname: Joi.string().min(3).max(20).required(),
    username: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required(),
    department: Joi.string().required(),
    phone: Joi.string().required(),
    dob: Joi.date().required(),
    bio: Joi.string().required(),
  }),
};