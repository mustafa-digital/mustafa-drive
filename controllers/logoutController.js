/**
 * -------------- logoutController.js ----------------
 */
const logoutController = {
  // log user out and redirect to the home page
  get: async (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
    });
    res.redirect("/");
  },
};

module.exports = logoutController;
