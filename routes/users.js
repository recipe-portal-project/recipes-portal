const express = require("express");
const router = express.Router();

const passport = require("passport");

const wrapAsync = require("../utils/wrapAsync");
const { storeReturnTo } = require("../middleware");
const { isSignedIn } = require("../middleware");

const users = require("../controllers/users");

router.route("/sign-up").get(users.renderSignUpForm).post(users.registerUser);

router
  .route("/sign-in")
  .get(users.renderSignInForm)
  .post(
    storeReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/sign-in",
    }),
    users.signInUser
  );

router.get("/sign-out", users.signOutUser);

router.get("/profile", isSignedIn, users.showProfile);

module.exports = router;
