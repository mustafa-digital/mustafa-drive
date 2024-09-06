const express = require("express");

const indexRouter = require("./index");
const loginRouter = require("./loginRouter");
const signUpRouter = require("./signupRouter");
const createFolderRouter = require("./createFolderRouter");
const folderRouter = require("./folderRouter");
// const uploadFileRouter = require("./uploadFileRouter");

module.exports = (app) => {
  app.use("/", indexRouter);
  app.use("/login", loginRouter);
  app.use("/signup", signUpRouter);
  app.use("/create-new-folder", createFolderRouter);
  app.use("/folder", folderRouter);
  // app.use("/uploadfile", uploadFileRouter);
};
