const express = require("express");

const indexRouter = require("./index");

module.exports = (app) => {
  app.use("/", indexRouter);
};
