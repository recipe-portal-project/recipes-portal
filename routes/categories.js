const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");

const categories = require("../controllers/categories");

router.get("/", wrapAsync(categories.index));

router.get("/:id", wrapAsync(categories.showCategoryRecipes));

module.exports = router;
