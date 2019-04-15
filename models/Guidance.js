const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuidanceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  }
});

module.exports = Guidance = mongoose.model("guidances", GuidanceSchema);
