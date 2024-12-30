// logger
const Logger = require("../log/logger");
const log = new Logger("user-controller");
log.info("all auth...");

const userSchema = require("../schema/users");
const jwt = require("jsonwebtoken");

async function verifyToken(req, res, next) {
  try {
    const token = req?.header("Authorization")?.split("Bearer")?.[1]?.trim();
    if (!token) return res.status(401).json({ error: "Access denied" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userSchema.findById({ _id: decoded?.id });
    if (!user) return res.status(401).json({ error: "Access denied" });
    req.user = user;
    next();
  } catch (error) {
    log.error(`Error in auth: ${error}`);
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;
