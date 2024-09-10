/**
 * -------------- createFolderRouter ----------------
 */
const createFolderController = require("../controllers/createFolderController");
const createFolderRouter = require("express").Router();

/**
 * -------------- MIDDLEWARE ----------------
 */
const { unauthorizedRedirect } = require("./middleware/authMiddleware");
createFolderRouter.use(unauthorizedRedirect);

/**
 * -------------- POST ROUTES ----------------
 */
createFolderRouter.post("/", createFolderController.post);

/**
 * -------------- GET ROUTES ----------------
 */
createFolderRouter.get("/", createFolderController.get);

module.exports = createFolderRouter;
