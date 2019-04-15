const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  page_ref: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false
  }
});

module.exports = Category = mongoose.model("category", CategorySchema);
