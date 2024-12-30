// logger
const Logger = require("../log/logger");
const log = new Logger("user-model");
log.info("all user model...");

const Validation = require("../validation/users");
const userModel = require("../model/users");

// register user controller
const registerUser = async function (req, res) {
  try {
    const body = req.body;
    const validations = Validation.registerUserValidation(body);
    if (!validations.success) {
      log.error("Invalid registration request for user registration...");
      return res.status(400).json(validations);
    }
    const registration = await userModel.registerUser(body);
    if (!registration.success) {
      log.error("Invalid registration request for user registration...");
      return res.status(registration.statusCode || 500).json(registration);
    }
    return res.status(201).json(registration);
  } catch (error) {
    log.error(`Error in register user request: ${error}`);
    return res.status(500).json({
      success: false,
      error: "Something went wrong.",
    });
  }
};

// login user controller
const loginUser = async function (req, res) {
  try {
    const body = req.body;
    const login = await userModel.loginUser(body);
    if (!login.success) {
      log.error("Invalid login request for user login...");
      return res.status(login.statusCode || 500).json(login);
    }
    return res.status(200).json(login);
  } catch (error) {
    log.error(`Error in login user request: ${error}`);
    return res.status(500).json({
      success: false,
      error: "Something went wrong.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
