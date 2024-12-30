// logger
const Logger = require("../log/logger");
const log = new Logger("user-validations");
log.info("all user validations...");

const Util = require("../util/util");

// register user validation

const registerUserValidation = function (body) {
  const validation = {
    success: true,
    errorList: [],
  };
  try {
    ["name", "email", "password"].forEach((e) => {
      if (!Util.isOwnPropertyExist(body, e) || !Util.isString(body[e])) {
        Util.addValidationError(validation, e, `Please provide ${e} in string`);
      }
      if (e === "email" && !Util.isValidEmail(body[e])) {
        Util.addValidationError(validation, e, `Please provide valid ${e}`);
      }
      if (e === "password" && !Util.isValidPassword(body[e])) {
        Util.addValidationError(
          validation,
          e,
          `Please provide a valid ${e}. It must be between 8 and 16 characters, include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character.`
        );
      }
    });
  } catch (error) {
    log.error(`Error in register user validation: ${error}`);
    Util.addValidationError(validation, "unknown", "Something went wrong");
  }
  return validation;
};

module.exports = {
  registerUserValidation,
};
