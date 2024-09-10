// redirects user to homepage if they are not logged in
// this is used in certain routes where only users should have access, like /folder or /file
const unauthorizedRedirect = (req, res, next) => {
  if (!res.locals.isAuth) res.redirect("/");
  next();
};

module.exports = {
  unauthorizedRedirect,
};
