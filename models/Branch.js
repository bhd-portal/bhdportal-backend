const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BranchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    },
    commander: {
        type: String,
        required: false
    },
    structure: {
        type: String,
        required: false
    }


});

module.exports = Branch = mongoose.model("branches", BranchSchema);
