const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  }
});


module.exports = Admin = mongoose.model("admins", AdminSchema);

// Create new instances.
Admin.create({name: "Aviv", password: "123456", avatar:"xxx"})