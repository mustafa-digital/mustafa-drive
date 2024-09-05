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

    // Pool.query(`SELECT * FROM Account WHERE email = ($1)`, [email])
    //   .then(async (res) => {
    //     const account = res.rows[0];
    //     console.log({ account });
    //     if (!account) {
    //       return done(null, false);
    //     }
    //     // TODO
    //     // query the Account table in db to find the username and password
    //     const isValid = await validatePassword(password, account.hash);
    //     if (isValid) {
    //       return done(null, account);
    //     } else {
    //       return done(null, false);
    //     }
    //   })
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
    // const { rows } = await Pool.query("SELECT * FROM Account WHERE id = $1", [
    //   id,
    // ]);
    // const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});

// ---
// END PASSPORT
