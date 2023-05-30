const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = require("./comment");

const RecipeSchema = new Schema(
  {
    title: String,
    description: String,
    cookingTime: Number,
    image: {
      url: String,
      filename: String,
    },
    ingredients: [
      {
        name: String,
        amount: Number,
        unit: {
          type: Schema.Types.ObjectId,
          ref: "Unit",
        },
      },
    ],
    instructions: [String],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

RecipeSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Comment.deleteMany({
      _id: {
        $in: doc.comments,
      },
    });
  }
});

module.exports = mongoose.model("Recipe", RecipeSchema);
