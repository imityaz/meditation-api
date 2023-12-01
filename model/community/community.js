const { default: mongoose } = require("mongoose");

const communitySchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Please add an email']
  },
  userName: {
    type: String,
    required: [true, 'Please add a userName']
  },
  text: {
    type: String,
    required: [true, 'Please add a text']
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

module.exports = mongoose.model("Community", communitySchema);