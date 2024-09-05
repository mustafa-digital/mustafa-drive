/**
 * -------------- LOGINROUTER ----------------
 */
const loginController = require("../controllers/loginController");
const loginRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */
loginRouter.post("/", loginController.post);

/**
 * -------------- GET ROUTES ----------------
 */
loginRouter.get("/", loginController.get);
module.exports = loginRouter;
