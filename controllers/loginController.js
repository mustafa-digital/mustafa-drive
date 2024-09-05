/**
 * -------------- LOGINCONTROLLER ----------------
 */
const loginController = {
  get: async (req, res, next) => {
    res.render("login", {
      title: "Mustafa-Drive Login Page",
    });
  },
};

module.exports = loginController;
