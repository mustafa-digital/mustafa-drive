/**
 * -------------- folderController ----------------
 */
const prisma = require("../config/client");
const multer = require("multer");
const fs = require("fs-extra");
const { body, validationResult } = require("express-validator");

const MAX_FOLDERNAME_LENGTH = 50;
const folderValidation = [
  body("folderName")
    .trim()
    .isLength({ max: MAX_FOLDERNAME_LENGTH })
    .withMessage("Folder Name must be less than 50 characters long."),
];

/**
 * -------------- multer diskStorage ----------------
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    const fileExtension =
      file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length,
      ) || "";
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

const getCurrentFolder = (req, res, next) => {
  const folderId = req.params.folderId;
  const folders = res.locals.folders;
  let currentFolder = null;
  folders.forEach((folder) => {
    if (folder.id === folderId) {
      currentFolder = folder;
      return;
    }
  });
  res.locals.currentFolder = currentFolder;
  next();
};

const folderController = {
  get: [
    getCurrentFolder,
    async (req, res, next) => {
      const folderId = req.params.folderId;
      try {
        const files = await prisma.file.findMany({
          where: { folderId: folderId },
        });
        res.render("folder", {
          title: `${res.locals.currentFolder.name} - Mustafa Drive`,
          files: files,
        });
      } catch (err) {
        res.status(500);
        throw new Error(err);
      }
    },
  ],
  postDelete: async (req, res, next) => {
    try {
      await prisma.folder.delete({
        where: {
          id: req.params.folderId,
        },
      });
      console.log(`Deleted folder ${req.params.folderId}`);
      res.redirect("/");
    } catch (err) {
      res.status(500);
    }
  },
  postUpdate: [
    folderValidation,
    getCurrentFolder,
    async (req, res, next) => {
      // get validation errors, if there are any
      const errors = validationResult(req);

      // if errors, re-render the create form with error messages
      if (!errors.isEmpty()) {
        // re-render the registration page with errors showing
        return res
          .status(400)
          .render(`/folder/:${req.params.folderId}/update`, {
            title: `${res.locals.folderName} - Mustafa Drive`,
            action: "update",
            postAction: `/folder/:${req.params.folderId}/update`,
            errors: errors.array(),
          });
      }
      try {
        console.log("trying to update");
        await prisma.folder.update({
          where: {
            id: req.params.folderId,
          },
          data: {
            name: req.body.folderName,
          },
        });
        console.log(
          `Updated folder ${req.params.folderId} name to ${req.body.folderName}`,
        );
        res.redirect("/");
      } catch (err) {
        res.status(500);
      }
    },
  ],
  getUpdate: [
    getCurrentFolder,
    (req, res, next) => {
      res.render("folderForm", {
        title: `${res.locals.folderName} - Mustafa Drive`,
        action: "update",
        postAction: `/folder/${req.params.folderId}/update`,
      });
    },
  ],
  postFile: [
    getCurrentFolder,
    upload.single("file"),
    async (req, res, next) => {
      // move the file from tmp folder to the user folder
      fs.move(
        `tmp/${req.file.filename}`,
        `uploads/${req.user.id}/${req.params.folderId}/${req.file.filename}`,
      );
      console.log(req.file);
      await prisma.file.create({
        data: {
          name: req.file.filename,
          originalname: req.file.originalname,
          size: req.file.size,
          folderId: req.params.folderId,
        },
      });

      // redirect user back to original folder
      res.redirect(`/folder/${req.params.folderId}`);
    },
  ],
};

module.exports = folderController;
