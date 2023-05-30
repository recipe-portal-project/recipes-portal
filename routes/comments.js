const express = require("express");
const router = express.Router({ mergeParams: true });

const wrapAsync = require("../utils/wrapAsync");
const {
  isSignedIn,
  isNotRecipeAuthor,
  isCommentAuthor,
  validateComment,
} = require("../middleware");

const comments = require("../controllers/comments");

router.post(
  "/",
  isSignedIn,
  isNotRecipeAuthor,
  validateComment,
  wrapAsync(comments.createComment)
);

router.delete(
  "/:commentId",
  isSignedIn,
  isCommentAuthor,
  wrapAsync(comments.deleteComment)
);

module.exports = router;
