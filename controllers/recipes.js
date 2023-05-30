const Recipe = require("../models/recipe");
const Unit = require("../models/unit");
const Category = require("../models/category");
const Comment = require("../models/comment");
const { cloudinary } = require("../cloudinary")
 
const ExpressError = require("../utils/ExpressError");

module.exports.index = async (req, res) => {
  const query = req.query.query?.trim();
  const totalPages = Math.ceil(await Recipe.count({}) / 6)
  const page = req.query.page ? req.query.page : 1

  const recipes = await Recipe.find({
    title: { $regex: new RegExp(query, "i") },
  }).populate({
    path: "comments",
    populate: {
      path: "author",
    },
  }).limit(page * 6);
  res.render("recipes/index", { recipes, query, page, totalPages });
};

module.exports.renderNewForm = async (req, res) => {
  const categories = await Category.find({});
  const units = await Unit.find({});
  res.render("recipes/new", { categories, units });
};

module.exports.renderEditForm = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id).populate("category");
  const categories = await Category.find({});
  const units = await Unit.find({});
  res.render("recipes/edit", { recipe, categories, units });
};

module.exports.createRecipe = async (req, res) => {
  const newRecipe = new Recipe(req.body.recipe);
  newRecipe.image = {
    url: req.file.path,
    filename: req.file.filename,
  };
  newRecipe.author = req.user._id;
  await newRecipe.save();
  console.log(newRecipe);
  req.flash("success", "Successfully published your recipe!");
  res.redirect(`/recipes/${newRecipe._id}`);
};

module.exports.updateRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body.recipe });
  req.flash("success", "Successfully updated recipe!");
  res.redirect(`/recipes/${recipe._id}`);
};

module.exports.showRecipe = async (req, res, next) => {
  if (req.params.id?.length !== 24) {
    next(new ExpressError("Page Not Found", 404));
  }
  const recipe = await Recipe.findById(req.params.id)
    ?.populate("ingredients.unit")
    ?.populate("author")
    ?.populate({
      path: "comments",
      populate: {
        path: "author",
      },
    });
  if (!recipe) {
    next(new ExpressError("Page Not Found", 404));
  }
  res.render("recipes/view", { recipe });
};

module.exports.deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const deletedRecipe = await Recipe.findByIdAndDelete(id);
  await cloudinary.uploader.destroy(deletedRecipe.image.filename);
  req.flash("success", "Successfully deleted your recipe!");
  res.redirect("/recipes");
};
