
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommanderWordsSchema = new Schema({

});

module.exports = CommanderWords = mongoose.model(
    "commander_words",
    CommanderWordsSchema
);
