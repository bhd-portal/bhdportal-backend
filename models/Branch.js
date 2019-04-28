const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema =new Schema({
    name: {
      type: String,
      required: true
    },
    category_id: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  });

module.exports = Branch = mongoose.model("branches", BranchSchema);
