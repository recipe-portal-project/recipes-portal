if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require("express");
const app = express();
const path = require("path");

const session = require("express-session");
const flash = require("connect-flash");

const methodOverride = require("method-override");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user");

const ExpressError = require("./utils/ExpressError");
const calcRating = require("./utils/calcRating");
const generateTimeAgo = require("./utils/generateTimeAgo");
const generateCookingTime = require("./utils/generateCookingTime");
const textOverflow = require("./utils/textOverflow")

const userRoutes = require("./routes/users");
const recipeRoutes = require("./routes/recipes");
const commentRoutes = require("./routes/comments");
const categoryRoutes = require("./routes/categories");

const Recipe = require("./models/recipe");
const Comment = require("./models/comment");
const wrapAsync = require("./utils/wrapAsync")

mongoose.connect("mongodb://127.0.0.1:27017/recipe-portal");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const sessionConfig = {
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 2,
    maxAge: 1000 * 60 * 60 * 24 * 2,
  },
};
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/", userRoutes);
app.use("/recipes", recipeRoutes);
app.use("/recipes/:id/comments", commentRoutes);
app.use("/categories", categoryRoutes);

app.locals.generateTimeAgo = generateTimeAgo;
app.locals.calcRating = calcRating;
app.locals.generateCookingTime = generateCookingTime;
app.locals.textOverflow = textOverflow;

app.get("/", wrapAsync(async (req, res) => {
  const recipes = await Recipe.find({}).populate({
    path: "comments",
    populate: {
      path: "author",
    },
  }).sort({createdAt: -1}).limit(7);
  res.render("home", { recipes });
}));

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).send(message);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
