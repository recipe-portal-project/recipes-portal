const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Unit", UnitSchema);
