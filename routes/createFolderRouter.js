/**
 * -------------- createFolderRouter ----------------
 */
const createFolderController = require("../controllers/createFolderController");
const createFolderRouter = require("express").Router();
/**
 * -------------- POST ROUTES ----------------
 */
createFolderRouter.post("/", createFolderController.post);

/**
 * -------------- GET ROUTES ----------------
 */
createFolderRouter.get("/", createFolderController.get);

module.exports = createFolderRouter;
