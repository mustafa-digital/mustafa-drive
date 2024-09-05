/**
 * -------------- LOGINCONTROLLER ----------------
 */
const passport = require("passport");
const loginController = {
  get: async (req, res, next) => {
    res.render("login", {
      title: "Mustafa-Drive Login Page",
    });
  },
  post: [
    passport.authenticate("local", { failureRedirect: "/login" }),
    async (req, res, next) => {
      res.redirect("/");
    },
  ],
};

module.exports = loginController;
