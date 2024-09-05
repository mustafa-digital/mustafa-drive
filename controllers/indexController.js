/**
 * -------------- INDEXCONTROLLER ----------------
 */
const indexController = {
  get: (req, res, next) => {
    res.render("index", {
      title: "Mustafa Drive",
    });
  },
};

module.exports = indexController;
