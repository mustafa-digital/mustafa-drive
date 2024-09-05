/**
 * -------------- INDEXROUTER ----------------
 */
const indexController = require("../controllers/indexController");

const indexRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */

/**
 * -------------- GET ROUTES ----------------
 */
indexRouter.get("/", indexController.get);

module.exports = indexRouter;
