/**
 * -------------- INDEXCONTROLLER ----------------
 */
const indexController = {
  getIndex: (req, res, next) => {
    res.render("index", {
      title: "Mustafa Drive",
    });
  },
};

module.exports = indexController;
