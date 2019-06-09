const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PowerpointSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category_id: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  file_id: {
    type: String,
    required: true
  }
});

module.exports = Powerpoint = mongoose.model(
  "powerpoints",
  PowerpointSchema
);
