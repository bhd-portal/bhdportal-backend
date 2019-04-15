const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
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
    required: false
  },
  subtitle: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  }
});

module.exports = Category = mongoose.model("subcategory", SubCategorySchema);
