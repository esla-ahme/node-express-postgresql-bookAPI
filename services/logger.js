/**
 * Winston logger
 * @module services/logger
 * @requires winston
 */

const winston = require("winston");
const dotenv = require("dotenv");
dotenv.config();
// timestamp + level + message
const dateFormat = () => {
  return new Date(Date.now()).toLocaleString();
};
class LoggerService {
  constructor(route) {
    this.route = route;
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
        new winston.transports.Console(),
        new winston.transports.File({
          filename: `${process.env.LOG_FILE_PATH}/${route}.log`,
        }),
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
