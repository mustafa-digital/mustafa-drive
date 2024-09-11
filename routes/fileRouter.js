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
fileRouter.post("/:fileId/delete", fileController.deleteFile);

/**
 * -------------- GET ROUTES ----------------
 */
fileRouter.get("/:fileId", fileController.get);
fileRouter.get("/:fileId/download", fileController.downloadFile);

module.exports = fileRouter;
