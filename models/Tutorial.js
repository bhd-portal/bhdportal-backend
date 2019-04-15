const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TutorialSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    required: true
  }
});

//Provides access only to the "tutorial" API to make changes to the TutorialSchema
module.exports = Tutorial = mongoose.model("tutorials", TutorialSchema);
