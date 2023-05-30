const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const { isSignedIn, isRecipeAuthor, validateRecipe } = require("../middleware");

const recipes = require("../controllers/recipes");

const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(recipes.index))
  .post(
    isSignedIn,
    upload.single("image"),
    validateRecipe,
    wrapAsync(recipes.createRecipe)
  );

router.get("/new", isSignedIn, wrapAsync(recipes.renderNewForm));

router
  .route("/:id")
  .get(wrapAsync(recipes.showRecipe))
  .delete(isSignedIn, isRecipeAuthor, wrapAsync(recipes.deleteRecipe))
  .put(
    isSignedIn,
    isRecipeAuthor,
    validateRecipe,
    wrapAsync(recipes.updateRecipe)
  );

router.get(
  "/:id/edit",
  isSignedIn,
  isRecipeAuthor,
  wrapAsync(recipes.renderEditForm)
);

module.exports = router;
