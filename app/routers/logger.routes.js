const express = require("express");

// GENERO EL ROUTER
const loggerRouter = express.Router();

loggerRouter.get("/", (req, res) => {
    // req.logger.warning("Prueba de alerta");
    req.logger.error("Prueba de error");
    // req.logger.fatal("Prueba de info");
    // req.logger.debug("Prueba de debug");
    // req.logger.silly("Prueba de silly");
    // req.logger.http("Prueba de http");
    // req.logger.verbose("Prueba de verbose");
    
    res.send({ message: "Prueba de logger!!" });
});
module.exports={
    loggerRouter
}