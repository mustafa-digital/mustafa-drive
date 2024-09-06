/**
 * -------------- deleteFolderController ----------------
 */
const prisma = require("../config/client");
const deleteFolderController = {
  post: async (req, res, next) => {
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
};

module.exports = deleteFolderController;
