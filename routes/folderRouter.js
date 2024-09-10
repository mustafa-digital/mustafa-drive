/**
 * -------------- folderRouter ----------------
 */
const folderController = require("../controllers/folderController");
const folderRouter = require("express").Router();

/**
 * -------------- MIDDLEWARE ----------------
 */
const { unauthorizedRedirect } = require("./middleware/authMiddleware");
folderRouter.use(unauthorizedRedirect);

/**
 * -------------- POST ROUTES ----------------
 */
folderRouter.post("/:folderId/delete", folderController.postDelete);
folderRouter.post("/:folderId/update", folderController.postUpdate);
folderRouter.post("/:folderId/uploadFile", folderController.postFile);

/**
 * -------------- GET ROUTES ----------------
 */
folderRouter.get("/:folderId", folderController.get);
folderRouter.get("/:folderId/update", folderController.getUpdate);

module.exports = folderRouter;
