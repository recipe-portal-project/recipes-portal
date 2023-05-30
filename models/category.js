const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  image: {
    url: String,
    filename: String,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
