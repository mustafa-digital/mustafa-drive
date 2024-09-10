/**
 * -------------- createFolderController.js ----------------
 */
const { body, validationResult } = require("express-validator");
const prisma = require("../config/client");

const MAX_FOLDERNAME_LENGTH = 50;
const folderValidation = [
  body("folderName")
    .trim()
    .isLength({ max: MAX_FOLDERNAME_LENGTH })
    .withMessage("Folder Name must be less than 50 characters long."),
];
const createFolderController = {
  get: (req, res, next) => {
    // redirect user to home page if not logged in
    if (!res.locals.isAuth) {
      res.redirect("/");
    }
    res.render("folderForm", {
      title: "Mustafa Drive - Create New Folder",
      action: "create",
      postAction: "/create-new-folder",
      errors: [],
    });
  },
  post: [
    folderValidation,
    async (req, res, next) => {
      // get validation errors, if there are any
      const errors = validationResult(req);

      // if errors, re-render the create form with error messages
      if (!errors.isEmpty()) {
        // re-render the registration page with errors showing
        return res.status(400).render("folderForm", {
          title: "Create New Folder - Mustafa Drive",
          action: "create",
          postAction: "/create-new-folder",
          errors: errors.array(),
        });
      }

      try {
        await prisma.folder.create({
          data: {
            name: req.body.folderName,
            accountId: req.user.id,
          },
        });
        console.log(`Created new folder: ${req.body.folderName}`);
        res.redirect("/");
      } catch (err) {
        res.status(500);
      }
    },
  ],
};

module.exports = createFolderController;
