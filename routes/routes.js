const express = require("express");

const indexRouter = require("./index");
const loginRouter = require("./loginRouter");
const signUpRouter = require("./signupRouter");
const createFolderRouter = require("./createFolderRouter");

module.exports = (app) => {
  app.use("/", indexRouter);
  app.use("/login", loginRouter);
  app.use("/signup", signUpRouter);
  app.use("/create-new-folder", createFolderRouter);
};
