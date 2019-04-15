const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  }
});

//Provides access only to the "game" API to make changes to the GameSchema
module.exports = Game = mongoose.model("games", GameSchema);
