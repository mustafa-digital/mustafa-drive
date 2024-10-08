/**
 * -------------- folderController ----------------
 */
const prisma = require("../config/client");
const multer = require("multer");
const { body, check, validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const environment = process.env.NODE_ENV;
let streamifier = require("streamifier");

/**
 * -------------- MIDDLEWARE ----------------
 */

/**
 * -------------- multer ----------------
 * This uses multer to upload a file and save it in the app's memory as a buffer
 * the buffer is then uploaded to cloudinary storage
 */
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * -------------- folder name validation ----------------
 *
 */
const MAX_FOLDERNAME_LENGTH = 50;
const folderValidation = [
  body("folderName")
    .trim()
    .isLength({ max: MAX_FOLDERNAME_LENGTH })
    .withMessage("Folder Name must be less than 50 characters long."),
];

/**
 * -------------- file upload validation ----------------
 */
const MAX_FILE_SIZE = 50000000; //50MB
const fileValidation = [
  // check that the file size is not greater than the maximum allowed
  check("file")
    .custom((value, { req }) => {
      if (req.file.size > MAX_FILE_SIZE) {
        return false;
      }
      return true;
    })
    .withMessage("Uploaded files cannot be more than 50MB."),
  // this validates that the file is the correct format by checking its MIME type
  check("file")
    .custom((value, { req }) => {
      const allowedMimeTypes =
        /^(application|audio|font|image|text|video)\/[a-zA-Z0-9\-\.]+$/;
      return allowedMimeTypes.test(req.file.mimetype);
    })
    .withMessage("Attempted file upload is not a valid file format."),
];

/**
 * -------------- checkValidationResults ----------------
 * This middleware checks the validation results of the request using express-validator validationResult function
 * If errors are found, the input is invalid, and express will render the appropriate form view with error messages so the user can try again
 */
const checkValidationResults = (req, res, next) => {
  // get validation errors, if there are any
  const errors = validationResult(req);
  req.errors = errors;
  // if errors, re-render the create form with error messages
  if (!errors.isEmpty()) {
    // add errors to locals
    res.status(400);
    // re-render the folder page with errors showing
    if (req.body.folderName)
      return res.status(400).render("folderForm", {
        title: "Update Folder - Mustafa Drive",
        action: "update",
        postAction: `/folder/${req.params.folderId}/update`,
        errors: errors.array(),
      });
    else
      return res.status(400).render("folder", {
        title: `${res.locals.currentFolder.name} - Mustafa Drive`,
        files: res.locals.currentFolder.files,
        errors: errors.array(),
      });
  }
  next();
};

/**
 * -------------- getFolderDetails ----------------
 * This middleware function queries the db to return the currentFolder's data, including files
 * The data is stored in res.locals.currentFolder
 */
const getFolderDetails = async (req, res, next) => {
  const folderId = req.params.folderId;
  res.locals.currentFolder = await prisma.folder.findFirst({
    where: {
      id: folderId,
    },
    include: {
      files: true,
    },
  });
  next();
};

/**
 * -------------- middlewareChain ----------------
 * This object stores the middleware chain for each request for this controller
 * This is just to reduce clutter in the controller object functions
 */
const middlewareChain = {
  get: [getFolderDetails],
  postDelete: [],
  postUpdate: [getFolderDetails, folderValidation, checkValidationResults],
  getUpdate: [getFolderDetails],
  postFile: [
    getFolderDetails,
    upload.single("file"),
    fileValidation,
    checkValidationResults,
  ],
};

/**
 * -------------- CONTROLLER OBJECT ----------------
 */

const folderController = {
  /**
   * -------------- get /folder ----------------
   */
  get: [
    middlewareChain.get,
    async (req, res, next) => {
      res.render("folder", {
        title: `${res.locals.currentFolder.name} - Mustafa Drive`,
        files: res.locals.currentFolder.files,
      });
    },
  ],

  /**
   * -------------- post /folder/:folderId/delete ----------------
   */
  postDelete: [
    middlewareChain.postDelete,
    async (req, res, next) => {
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
  ],

  /**
   * -------------- post /folder/:folderId/update ----------------
   */
  postUpdate: [
    middlewareChain.postUpdate,
    async (req, res, next) => {
      // get validation errors, if there are any
      const errors = validationResult(req);

      // if errors, re-render the create form with error messages
      if (!errors.isEmpty()) {
        console.log("erors");
        // re-render the registration page with errors showing
        return res.status(400).render(`folderForm`, {
          title: `${res.locals.folderName} - Mustafa Drive`,
          action: "update",
          postAction: `/folder/:${req.params.folderId}/update`,
          errors: errors.array(),
        });
      }
      try {
        const originalFolderName = res.locals.currentFolder.name;
        await prisma.folder.update({
          where: {
            id: req.params.folderId,
          },
          data: {
            name: req.body.folderName,
          },
        });
        console.log(
          `Updated folder ${req.params.folderId} name from "${originalFolderName}" to "${req.body.folderName}"`,
        );
        res.redirect(`/folder/${res.locals.currentFolder.id}`);
      } catch (err) {
        res.status(500);
        next(err);
      }
    },
  ],

  /**
   * -------------- get /folder/:folderId/update ----------------
   */
  getUpdate: [
    middlewareChain.getUpdate,
    (req, res, next) => {
      res.render("folderForm", {
        title: `${res.locals.currentFolder.name} - Mustafa Drive`,
        action: "update",
        postAction: `/folder/${req.params.folderId}/update`,
      });
    },
  ],

  /**
   * -------------- post /folder/:folderId/uploadfile ----------------
   */
  postFile: [
    middlewareChain.postFile,
    async (req, res, next) => {
      // upload the file to cloudinary storage
      const folderPath =
        environment === "production"
          ? `mustafa-drive/${req.user.id}/${req.params.folderId}`
          : `dev-storage/${req.user.id}/${req.params.folderId}`;

      // use cloudinary sdk to create an upload stream of the file
      let cld_upload_stream = cloudinary.uploader.upload_stream(
        { folder: folderPath, resource_type: "auto" },
        async (cloudError, result) => {
          console.log(cloudError, result);

          if (cloudError) {
            throw new Error(cloudError);
          }

          // update the database
          try {
            await prisma.file.create({
              data: {
                name: result.display_name + "." + result.format,
                originalname: req.file.originalname,
                size: req.file.size,
                assetId: result.asset_id,
                publicId: result.public_id,
                folderId: req.params.folderId,
              },
            });

            // redirect user back to original folder
            res.redirect(`/folder/${req.params.folderId}`);
          } catch (dbError) {
            throw new Error(dbError);
          }
        },
      );
      // create a readable stream using the file buffer to pipe to cloudinary upload stream
      streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
    },
  ],
};

module.exports = folderController;
