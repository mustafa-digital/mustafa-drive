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
const LocalStrategy = require("passport-local").Strategy;

/**
 * -------------- GENERAL SETUP ----------------
 */
// Create the connection to postgres database session
// const pgSession = require("connect-pg-simple")(session);

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
 * -------------- ROUTES ----------------
 * Assign all the routes from routes.js to app
 */
require("./routes/routes")(app);

/**
 * -------------- SERVER ----------------
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Starting server on port ${PORT}`));
