/**
 * -------------- fileController ----------------
 */
const prisma = require("../config/client");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const { Readable } = require("stream");
const { finished } = require("stream/promises");

/**
 * -------------- MIDDLEWARE ----------------
 */

// get the file details of the file that was clicked on based on the fileId in the URL
const getFileDetails = async (req, res, next) => {
  const fileId = req.params.fileId;

  try {
    file = await prisma.file.findFirst({
      where: {
        id: fileId,
      },
    });

    if (!file) {
      throw new Error("No file found.");
    }
    console.log({ file });

    res.locals.file = file;
    next();
  } catch (err) {
    throw new Error(err);
  }
};

const getCurrentFolder = (req, res, next) => {
  const folderId = res.locals.file.folderId;
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

/**
 * -------------- CONTROLLER ----------------
 */
const fileController = {
  get: [
    getFileDetails,
    getCurrentFolder,
    async (req, res, next) => {
      res.render("file", {
        title: "File - ",
        file: res.locals.file,
      });
    },
  ],

  downloadFile: [
    getFileDetails,
    async (req, res, next) => {
      cloudinary.api
        .resources_by_asset_ids([res.locals.file.assetId])
        .then(async (result) => {
          const resourceURL = result.resources[0].secure_url;

          const stream = fs.createWriteStream(
            `tmp/${res.locals.file.originalname}`,
          );
          const { body } = await fetch(resourceURL);
          await finished(Readable.fromWeb(body).pipe(stream));

          res.download(`tmp/${res.locals.file.originalname}`, (err) => {
            if (err) {
              throw new Error(err);
            } else {
              console.log(`downloaded file ${res.locals.file.originalname}`);
              fs.unlink(`tmp/${res.locals.file.originalname}`, (err) => {
                console.log(err);
              });
            }
          });
        });
    },
  ],
  deleteFile: [
    getFileDetails,
    getCurrentFolder,
    async (req, res, next) => {
      try {
        // delete file record from db
        await prisma.file.delete({
          where: {
            id: req.params.fileId,
          },
        });

        // delete asset from cloudinary based on assetId
        cloudinary.api
          .delete_resources([res.locals.file.assetId])
          .then((result, err) => {
            if (err) {
              console.log(err);
            } else {
              console.log(result);
            }
          });

        console.log(`Deleted file ${req.params.fileId}`);
        res.redirect(`/folder/${res.locals.currentFolder.id}`);
      } catch (err) {
        console.log(err);
      }
    },
  ],
};

module.exports = fileController;
