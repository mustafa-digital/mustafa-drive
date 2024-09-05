/**
 * -------------- LOGINROUTER ----------------
 */
const loginController = require("../controllers/loginController");
const loginRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */

/**
 * -------------- GET ROUTES ----------------
 */
loginRouter.get("/", loginController.get);
module.exports = loginRouter;
