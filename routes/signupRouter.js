/**
 * -------------- SIGNUPROUTER ----------------
 */
const signUpController = require("../controllers/signUpController");
const signUpRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */

/**
 * -------------- GET ROUTES ----------------
 */
signUpRouter.get("/", signUpController.get);

module.exports = signUpRouter;
