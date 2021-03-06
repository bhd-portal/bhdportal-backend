const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subcategory_id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  avatar_file_id: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  checked: {
    type: Boolean,
    default: false
  }
});

module.exports = Product = mongoose.model("product", ProductSchema);
