/**
 * -------------- fileController ----------------
 */
const prisma = require("../config/client");

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

  downloadFile: async (req, res, next) => {},
};

module.exports = fileController;
