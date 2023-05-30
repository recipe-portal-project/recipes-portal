const User = require("../models/user");

module.exports.renderSignUpForm = (req, res) => {
  res.render("users/sign-up");
};

module.exports.registerUser = async (req, res, next) => {
  try {
    const { fullName, email, username, password } = req.body;
    const user = new User({ fullName, email, username });
    const newUser = await User.register(user, password);
    req.login(newUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Tastebite!");
      res.redirect("/");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/sign-up");
  }
};

module.exports.renderSignInForm = (req, res) => {
  res.render("users/sign-in");
};

module.exports.signInUser = (req, res) => {
  req.flash("success", "Welcome back to Tastebite!");
  const redirectUrl = res.locals.returnTo || "/";
  res.redirect(redirectUrl);
};

module.exports.signOutUser = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.flash("success", "Goodbye!");
    res.redirect("/");
  });
};

module.exports.showProfile = (req, res) => {
  res.render("users/profile");
};
