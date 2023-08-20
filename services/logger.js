/**
 * Winston logger
 * @module services/logger
 * @requires winston
 */

const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const dotenv = require("dotenv");
dotenv.config();
// timestamp + level + message
const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
};

/*
  const oldTransport= new winston.transports.File({
          filename: `${process.env.LOG_FILE_PATH}/${route}.log`,
        })
const newTransport = new winstonDaily({
      filename: `${process.env.LOG_FILE_PATH}/${route}/%DATE%.log`,
      datePattern: "YYYY-MM-DD-HH-mm",
      zippedArchive: true, // zip old files
      maxSize: "5m", // 5mb per file
      maxFiles: "7d", //minutes
    });
        */
class LoggerService {
  constructor(route) {
    this.route = route;
    this.transport = new winstonDaily({
      filename: `${process.env.LOG_FILE_PATH}/${route}/%DATE%.log`,
      datePattern: "YYYY-MM-DD-HH-mm",
      zippedArchive: true, // zip old files
      maxSize: "5m", // 5mb per file
      maxFiles: "7d", //minutes
    });
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.printf((info) => {
        let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${
          info.message
        } | `;
        message = info.obj ? (message += JSON.stringify(info.obj)) : message;
        return message;
      }),

      transports: [
        // new winston.transports.Console(),
        this.transport,
      ],
    });
  }

  async info(message, obj) {
    this.logger.log("info", message, { route: this.route, obj });
  }
  async error(message, obj) {
    this.logger.log("error", message, { route: this.route, obj });
  }
  async debug(message, obj) {
    this.logger.log("debug", message, { route: this.route, obj });
  }
  async warn(message, obj) {
    this.logger.log("warn", message, { route: this.route, obj });
  }
}

module.exports = LoggerService;
