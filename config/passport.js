/**
 * -------------- PASSPORT.JS --------------
 * This module sets up passport authentication with the local strategy
 * It is called from app.js to initialize passport
 */
const prisma = require("../config/client");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { validatePassword } = require("../lib/passwordUtils");

// START PASSPORT

passport.use(
  new LocalStrategy(async function (username, password, done) {
    const account = await prisma.account.findFirst({
      where: {
        username: username,
      },
    });

    if (!account) {
      return done(null, false);
    }

    const isValid = await validatePassword(password, account.hash);

    if (isValid) {
      return done(null, account);
    } else {
      return done(null, false);
    }
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.account.findFirst({
      where: {
        id: id,
      },
    });

    done(null, user);
  } catch (err) {
    done(err);
  }
});

// ---
// END PASSPORT
