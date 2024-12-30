// logger
const Logger = require("../log/logger");
const log = new Logger("index-route");
log.info('importing and setting all routes...')

const express = require("express");
const router = express.Router();

// import routes
const userRoute = require("./users");
const productRoute = require("./product");

// setting routes
router.use("/user", userRoute);
router.use("/product", productRoute);

module.exports = router;
