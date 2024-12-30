const isOwnPropertyExist = function (target, prop) {
  return Object.prototype.hasOwnProperty.call(target, prop);
};

const isString = function (value) {
  return typeof value === "string";
};

const isNumber = function (value) {
  return typeof value === "number" && !isNaN(value);
};

const isValidEmail = function (email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
const isValidPassword = function (password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/.test(password);
};

const addValidationError = function (resp, key, errorMessage) {
  resp.success = false;
  resp.errorList.push({ key, error: errorMessage });
};

module.exports = {
  isOwnPropertyExist,
  isString,
  isValidEmail,
  addValidationError,
  isValidPassword,
  isNumber,
};
