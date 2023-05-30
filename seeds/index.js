const mongoose = require("mongoose");

const Recipe = require("../models/recipe");
const Unit = require("../models/unit");
const Category = require("../models/category");

const { units } = require("./seedData");
const { categories } = require("./seedData");
const { recipes } = require("./seedData");

mongoose.connect("mongodb://127.0.0.1:27017/recipe-portal");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const seedDB = async () => {
  await Unit.deleteMany({});
  units.forEach(async (el) => {
    const newUnit = new Unit({ name: el });
    await newUnit.save();
  });

  await Category.deleteMany({});
  categories.forEach(async (el) => {
    const newCategory = new Category(el);
    await newCategory.save();
  });

  await Recipe.deleteMany({});
  // recipes.forEach(async (el) => {
  //   const category = await Category.findOne({ name: el.category });

  //   const ingredients = await Promise.all(
  //     el.ingredients.map(async (ingredient) => {
  //       const unit = await Unit.findOne({ name: ingredient.unit });
  //       return {
  //         ...ingredient,
  //         unit,
  //       };
  //     })
  //   );
  //   const newRecipe = new Recipe({
  //     ...el,
  //     category,
  //     ingredients,
  //     author: "6471341aff1d15633cfdf12c",
  //   });
  //   await newRecipe.save();
  // });
};

seedDB();
