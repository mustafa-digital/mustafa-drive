/**
 * -------------- fileController ----------------
 */
const fileController = {
  get: async (req, res, next) => {
    res.render("file", {
      title: "File - ",
    });
  },
};

module.exports = fileController;
