const winston = require("winston");

const dotenv = require("dotenv");
dotenv.config();

const ENVIRONMENT = process.env.ENVIRONMENT;
console.log(ENVIRONMENT);

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5,
    },
    colors: {
        fatal: "red",
        error: "red",
        warning: "yellow",
        info: "green",
        http:"white",
        debug: "blue",
    },
};


let logger;

if (ENVIRONMENT === "PRODUCTION") {
    logger = winston.createLogger({
        levels:customLevelsOptions.levels,
        transports: [
            new winston.transports.Console({
                level: "info",
                format:winston.format.combine(
                    winston.format.colorize({colors:customLevelsOptions.colors}),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: "logs/errors.log",
                level: "error",
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                ),
            }),
        ],
    });
    }else{
        logger = winston.createLogger({
            levels:customLevelsOptions.levels,
            transports: [
                new winston.transports.Console({
                level: "debug",
                format:winston.format.combine(
                    winston.format.colorize({colors:customLevelsOptions.colors}),
                    winston.format.simple()
                )
                }),
            ],
        });
    }

const addLogger = (req,res,next) =>{
    req.logger=logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toISOString()}`);
    next();
};

module.exports={
    addLogger
}



















// const customLevelsOptions = {
//     levels: {
//         fatal: 0,
//         error: 1,
//         warning: 2,
//         info: 3,
//         http: 4,
//         debug: 5,
//     },
//     colors: {
//         fatal: "red",
//         error: "orange",
//         warning: "yellow",
//         info: "green",
//         http:"white",
//         debug: "blue",
//     },
// };