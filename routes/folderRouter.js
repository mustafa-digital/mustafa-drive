/**
 * -------------- folderRouter ----------------
 */
const folderController = require("../controllers/folderController");
const folderRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */
folderRouter.post("/:folderId/delete", folderController.postDelete);
folderRouter.post("/:folderId/update", folderController.postUpdate);

/**
 * -------------- GET ROUTES ----------------
 */
folderRouter.get("/:folderId", folderController.get);
folderRouter.get("/:folderId/update", folderController.getUpdate);

module.exports = folderRouter;
