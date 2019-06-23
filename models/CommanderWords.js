
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommanderWordsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

module.exports = CommanderWords = mongoose.model(
    "commander_words",
    CommanderWordsSchema
);
