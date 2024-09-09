/**
 * -------------- logoutRouter.js ----------------
 */
const logoutController = require("../controllers/logoutController");

const logoutRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */

/**
 * -------------- GET ROUTES ----------------
 */
logoutRouter.get("/", logoutController.get);

module.exports = logoutRouter;
