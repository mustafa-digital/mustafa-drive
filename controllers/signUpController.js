/**
 * -------------- signUpController ----------------
 */
const prisma = require("../config/client");
const { body, validationResult } = require("express-validator");
const { genPasswordHash } = require("../lib/passwordUtils");
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 20;
const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 6;
const alphaErr = "must only contain letters.";
const lengthErrName = `must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`;
const lengthErrUsername = `must be between ${MIN_USERNAME_LENGTH} and ${MAX_USERNAME_LENGTH} characters.`;
const lengthErrPassword = `Password must contain atleast ${MIN_PASSWORD_LENGTH} characters.`;

/**
 * -------------- INPUT VALIDATION ----------------
 * Checking the inputs from the registration form for validation
 */
const accountValidation = [
  body("username")
    .trim()
    .isLength({ min: MIN_USERNAME_LENGTH, max: MAX_USERNAME_LENGTH })
    .withMessage(`Username ${lengthErrUsername}`)
    .isAlphanumeric()
    .withMessage("Username can only contain letters and numbers."),

  body("password")
    .trim()
    .isLength({ min: MIN_PASSWORD_LENGTH })
    .withMessage(lengthErrPassword),
  body("password-confirm")
    .trim()
    .custom((value, { req }) => {
      // check if the confirm password field is the same as the first password field, return true if so
      if (value === req.body.password) {
        return true;
      }
      // the password fields do not match, so return false
      return false;
    })
    .withMessage("Password fields must match."),
];

const signUpController = {
  get: async (req, res, next) => {
    res.render("signup", {
      title: "Mustafa-Drive Sign Up Page",
    });
  },
  post: [
    accountValidation,
    async (req, res, next) => {
      // get validation errors, if there are any
      const errors = validationResult(req);

      // if errors, re-render the create form with error messages
      if (!errors.isEmpty()) {
        // re-render the registration page with errors showing
        return res.status(400).render("signup", {
          title: "Mustafa-Drive Sign Up Page",
          errors: errors.array(),
        });
      }
      // if no errors, save the account details in the database, then redirect user to homepage
      const hash = await genPasswordHash(req.body.password);
      try {
        await prisma.account.create({
          data: {
            username: req.body.username,
            hash: hash,
          },
        });
        console.log("created new user");
      } catch (err) {
        res.status(500);
      }

      res.redirect("/");
    },
  ],
};

module.exports = signUpController;
