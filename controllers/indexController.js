/**
 * -------------- INDEXCONTROLLER ----------------
 */
const prisma = require("../config/client");
const indexController = {
  get: async (req, res, next) => {
    let result;
    if (res.locals.isAuth) {
      result = await prisma.folder.findMany({
        where: { accountId: req.user.id },
      });
    }
    res.render("index", {
      title: "Mustafa Drive",
      folders: result,
    });
  },
};

module.exports = indexController;
