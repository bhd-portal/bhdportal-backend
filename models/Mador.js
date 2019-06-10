const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MadorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  branch_id: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  imageURL: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = Mador = mongoose.model("mador", MadorSchema);
