const winston = require("winston");

const logger = winston.createLogger({
    level: "error",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
    ),

    transports: [
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

module.exports = {
    logger
}