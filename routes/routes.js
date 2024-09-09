const express = require("express");

const indexRouter = require("./index");
const loginRouter = require("./loginRouter");
const logoutRouter = require("./logoutRouter");
const signUpRouter = require("./signupRouter");
const createFolderRouter = require("./createFolderRouter");
const folderRouter = require("./folderRouter");
const fileRouter = require("./fileRouter");

module.exports = (app) => {
  app.use("/", indexRouter);
  app.use("/login", loginRouter);
  app.use("/logout", logoutRouter);
  app.use("/signup", signUpRouter);
  app.use("/create-new-folder", createFolderRouter);
  app.use("/folder", folderRouter);
  app.use("/file", fileRouter);
};
