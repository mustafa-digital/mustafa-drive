/**
 * -------------- SIGNUPROUTER ----------------
 */
const signUpController = require("../controllers/signUpController");
const signUpRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */
signUpRouter.post("/", signUpController.post);

/**
 * -------------- GET ROUTES ----------------
 */
signUpRouter.get("/", signUpController.get);

module.exports = signUpRouter;
