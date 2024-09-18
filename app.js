/**
 * -------------- MUSTAFA_DRIVE --------------
 * This app is basically a distilled "google drive" that allows a user to login and upload/download their files into organized folders
 */

/**
 * -------------- DEPENDENCIES --------------
 */
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("./config/client");
require("./config/cloudinary");

/**
 * -------------- GENERAL SETUP ----------------
 */

// Create the Express application
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static assets folder
app.use(express.static(__dirname + "/public"));

/**
 * -------------- VIEWS SETUP ----------------
 */
app.set("view engine", "ejs");

/**
 * -------------- SESSION SETUP ----------------
 */

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 30 days
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  }),
);

/**
 * -------------- PASSPORT INIT ----------------
 */
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- MIDDLEWARE ----------------
 */
// adds the isAuth property to res.locals for fast authentication
app.use((req, res, next) => {
  const isAuth = req.isAuthenticated();
  res.locals.isAuth = isAuth;
  next();
});

app.use(async (req, res, next) => {
  if (res.locals.isAuth) {
    // console.log(req.user);
    res.locals.username = req.user.username;
    const folders = await prisma.folder.findMany({
      where: { accountId: req.user.id },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (folders.length) res.locals.folders = folders;
  }
  // console.log(res.locals.folders);
  next();
});

/**
 * -------------- ROUTES ----------------
 * Assign all the routes from routes.js to app
 */
require("./routes/routes")(app);

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).render("error", {
    error: err,
  });
});

/**
 * -------------- SERVER ----------------
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Starting server on port ${PORT}`)); // listen on port
