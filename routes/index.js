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
indexRouter.get("/", indexController.getIndex);

module.exports = indexRouter;
