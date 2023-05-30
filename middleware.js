const Recipe = require("./models/recipe");
const Comment = require("./models/comment");
const { recipeSchema, commentSchema } = require("./schemas");
const ExpressError = require("./utils/ExpressError");

module.exports.isSignedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/sign-in");
  }
  next();
};

module.exports.isRecipeAuthor = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (!recipe.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/recipes/${id}`);
  }
  next();
};

module.exports.isNotRecipeAuthor = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await Recipe.findById(id);
  if (recipe.author.equals(req.user._id)) {
    req.flash("error", "You can't comment your own recipe!");
    return res.redirect(`/recipes/${id}`);
  }
  next();
};

module.exports.isCommentAuthor = async (req, res, next) => {
  const { id, commentId } = req.params;
  const comment = await Comment.findById(commentId);
  if (!comment.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/recipes/${id}`);
  }
  next();
};

module.exports.validateRecipe = async (req, res, next) => {
  await recipeSchema.validate(req.body).catch((err) => {
    next(new ExpressError(err.message, 400));
  });
  next();
};

module.exports.validateComment = async (req, res, next) => {
  await commentSchema.validate(req.body).catch((err) => {
    next(new ExpressError(err.message, 400));
  });
  next();
};

module.exports.storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) {
    res.locals.returnTo = req.session.returnTo;
  }
  next();
};
