// logger
const Logger = require("../log/logger");
const log = new Logger("user-controller");
log.info("all user model...");

const userSchema = require("../schema/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register user model
const registerUser = async function (body) {
  const resp = {
    success: true,
  };
  try {
    const user = await userSchema.findOne({ email: body?.email });
    if (user) {
      log.error(`Email already exist`);
      resp.success = false;
      resp.error = "Email already exist.";
      resp.statusCode = 400;
      return resp;
    }
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body?.password, salt);
    const register = await userSchema.create(body);
    resp.message = "User register successfully";
    resp.data = {
      id: register._id,
      email: register.email,
      name: register.name,
      createdAt: register.createdAt,
      updatedAt: register.updatedAt,
    };
  } catch (error) {
    log.error(`Error in register user model: ${error}`);
    resp.success = false;
    resp.error = "Something went wrong";
  }
  return resp;
};

// login user model
const loginUser = async function (body) {
  const resp = {
    success: true,
  };
  try {
    const user = await userSchema.findOne({ email: body?.email });
    if (!user) {
      log.error(`No user exist`);
      resp.success = false;
      resp.error = "No user exist.";
      resp.statusCode = 404;
      return resp;
    }
    const isMatch = await bcrypt.compare(
      body?.password || "a",
      user?.password || "b"
    );
    if (!isMatch) {
      log.error(`No user exist`);
      resp.success = false;
      resp.error = "No user exist.";
      resp.statusCode = 404;
      return resp;
    }
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    resp.message = "User login successfully";
    resp.data = {
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    };
  } catch (error) {
    log.error(`Error in login user model: ${error}`);
    resp.success = false;
    resp.error = "Something went wrong";
  }
  return resp;
};

module.exports = {
  registerUser,
  loginUser,
};
