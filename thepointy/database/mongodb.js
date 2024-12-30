// logger
const Logger = require("../log/logger");
const log = new Logger("database");
log.info('DB connection running...')

const mongoose = require('mongoose');

module.exports.connect = () => {

  mongoose.connect(process.env.DB_URL || 'mongodb://127.0.0.1:27017/thepointy')
    .catch((err) => {
      log.info('Mongoose connection error', err.message);
      process.exit(0);
    });

  mongoose.connection.on('connected', () => {
    log.info('MongoDB connected');
  });

  mongoose.connection.on('error', (err) => {
    log.info('Mongoose connection error', err.message);
    process.exit(0);
  });

  mongoose.connection.on('disconnected', () => {
    log.info('Mongoose connection is disconnected...');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      log.info('Mongoose connection is disconnected due to app termination...');
      process.exit(0);
    });
  });

};