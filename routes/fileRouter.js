/**
 * -------------- fileRouter ----------------
 */
const fileController = require("../controllers/fileController");
const fileRouter = require("express").Router();

/**
 * -------------- MIDDLEWARE ----------------
 */
const { unauthorizedRedirect } = require("./middleware/authMiddleware");
fileRouter.use(unauthorizedRedirect);

/**
 * -------------- POST ROUTES ----------------
 */
fileRouter.post("/:fileId/download", fileController.downloadFile);

/**
 * -------------- GET ROUTES ----------------
 */
fileRouter.get("/:fileId", fileController.get);

module.exports = fileRouter;
