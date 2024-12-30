const debug = require("debug");

class _Logger {
  constructor(moduleName) {
    this.infoLogger = debug(`app:${moduleName}`);
    this.warnLogger = debug(`app:${moduleName}`);
    this.errorLogger = debug(`app:${moduleName}`);
    this.alertLogger = debug(`app:${moduleName}`);
    this.fatalLogger = debug(`app:${moduleName}`);
  }

  info(message) {
    this.infoLogger(`🔵 [INFO]: ${message}`);
  }

  warn(message) {
    this.warnLogger(`⚠️  [WARN]: ${message}`);
  }

  error(message) {
    this.errorLogger(`❌ [ERROR]: ${message}`);
  }

  alert(message) {
    this.alertLogger(`🚨 [ALERT]: ${message}`);
  }

  fatal(message) {
    this.fatalLogger(`🔥 [FATAL]: ${message}`);
  }

  table(data) {
    console.table(data);
  }
}

// Freeze the entire class
Object.freeze(_Logger);
Object.freeze(_Logger.prototype);

module.exports = _Logger;
