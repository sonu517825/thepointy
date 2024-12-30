// logger
const Logger = require("../log/logger");
const log = new Logger("user-route");
log.info("all user routes...");

const userController = require("../controller/users");
const express = require("express");
const router = express.Router();

// user registration - POST /api/user/register
router.post("/register", userController.registerUser);

// user login - POST /api/user/login
router.post("/login", userController.loginUser);

module.exports = router;
