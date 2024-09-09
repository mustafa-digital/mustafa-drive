/**
 * -------------- fileRouter ----------------
 */
const fileController = require("../controllers/fileController");
const fileRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */

/**
 * -------------- GET ROUTES ----------------
 */
fileRouter.get("/", fileController.get);

module.exports = fileRouter;
