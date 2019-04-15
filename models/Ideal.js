const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IdealSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

module.exports = Ideal = mongoose.model("ideals", IdealSchema);
