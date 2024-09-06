/**
 * -------------- INDEXCONTROLLER ----------------
 */
const prisma = require("../config/client");
const indexController = {
  get: async (req, res, next) => {
    res.render("index", {
      title: "Mustafa Drive",
    });
  },
};

module.exports = indexController;
