/**
 * -------------- deleteFolderRouter ----------------
 */
const deleteFolderController = require("../controllers/deleteFolderController");

const deleteFolderRouter = require("express").Router();

/**
 * -------------- POST ROUTES ----------------
 */
deleteFolderRouter.post("/:folderId", deleteFolderController.post);

/**
 * -------------- GET ROUTES ----------------
 */
module.exports = deleteFolderRouter;
