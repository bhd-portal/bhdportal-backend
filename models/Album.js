const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true
    }
});

module.exports = Album = mongoose.model(
    "Albums",
    AlbumSchema
);
