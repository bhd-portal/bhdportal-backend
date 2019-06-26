const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PictureSchema = new Schema({
   name: {
       type: String,
       required: true
   },
    file_id: {
       type: String,
        required: true
    }
});

module.exports = Picture = mongoose.model(
  "pictures",
    PictureSchema
);
