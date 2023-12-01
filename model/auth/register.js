const { default: mongoose } = require("mongoose");

const registerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Please add a firstName']
  },
  lastName: {
    type: String,
    required: [true, 'Please add a lastName']
  },
  email: {
    type: String,
    required: [true, 'Please add an email']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  },
});

module.exports = mongoose.model("Register", registerSchema);