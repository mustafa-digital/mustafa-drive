const express = require("express");

const indexRouter = require("./index");
const loginRouter = require("./loginRouter");
const signUpRouter = require("./signupRouter");

module.exports = (app) => {
  app.use("/", indexRouter);
  app.use("/login", loginRouter);
  app.use("/signup", signUpRouter);
};
