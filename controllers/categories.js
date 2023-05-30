const Category = require("../models/category");
const Recipe = require("../models/recipe");

module.exports.index = async (req, res) => {
  const categories = await Category.find({}).sort({name: 1});
  res.render("categories/index", { categories });
};

module.exports.showCategoryRecipes = async (req, res) => {
  const categoryName = req.params.id.replace("-", " ");
  const category = await Category.findOne({
    name: { $regex: new RegExp(categoryName, "i") },
  });

  const totalPages = Math.ceil(await Recipe.count({category}) / 6)
  const page = req.query.page ? req.query.page : 1
  
  const recipes = await Recipe.find({ category }).populate({
    path: "comments",
    populate: {
      path: "author",
    },
  });
  res.render("categories/show", { category, recipes, page, totalPages});
};
