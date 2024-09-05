/**
 * -------------- signUpController ----------------
 */
const signUpController = {
  get: async (req, res, next) => {
    res.render("signup", {
      title: "Mustafa-Drive Sign Up Page",
    });
  },
};

module.exports = signUpController;
