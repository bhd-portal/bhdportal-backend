const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FileSchema = new Schema({
  filename:{
    type: String,
    required: true
  },
  data: {
    type: Buffer,
    required: true
  },
  category: {
    type: String,
    required: false
  }
});

module.exports = File = mongoose.model(
  "files",
    FileSchema
);
