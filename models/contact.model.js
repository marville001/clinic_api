const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  contacttype: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  availability: {
    type: String,
    required:true,
  },

  address: {
    type: String,
    required: true,
  },
  phone: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
  },
});

const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
