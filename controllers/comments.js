const Recipe = require("../models/recipe");
const Comment = require("../models/comment");

module.exports.createComment = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  const newComment = new Comment(req.body.comment);
  newComment.author = req.user._id;
  recipe.comments.push(newComment);
  await newComment.save();
  await recipe.save();
  req.flash("success", "Successfully posted your comment!");
  res.redirect(`/recipes/${id}`);
};

module.exports.deleteComment = async (req, res) => {
  const { id, commentId } = req.params;
  await Recipe.findByIdAndUpdate(id, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  req.flash("success", "Successfully deleted your comment!");
  res.redirect(`/recipes/${id}`);
};
