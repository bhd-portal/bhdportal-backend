const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subcategory_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  href: {
    type: String,
    required: true
  }
});

module.exports = Document = mongoose.model("documents", DocumentSchema);
