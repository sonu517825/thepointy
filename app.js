require("dotenv").config({ path: "./.env" });
const express = require("express");
const logger = require("morgan");

// logger
const Logger = require("./log/logger");
const log = new Logger("app");
log.info("starting...");

// routes
const indexRouter = require("./routes/index");

// db
const database = require("./database/mongodb");
database.connect();

// job
require('./job/job')

const app = express();

// app settings
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", indexRouter);

// global error handler
app.use((error, req, res, next) => {
  log.error(`Global error ${error}`);

  const statusCode = error?.status || 500;
  return res.status(statusCode).json({
    message: error?.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  });
});

module.exports = app;
