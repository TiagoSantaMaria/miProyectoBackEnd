const express = require("express");

// GENERO EL ROUTER
const loggerRouter = express.Router();

loggerRouter.get("/", (req, res) => {
    // req.logger.warning("Prueba de alerta");
    // req.logger.error("Prueba de error");
    // req.logger.info("Prueba de info");
    // req.logger.debug("Prueba de debug");
    // req.logger.silly("Prueba de silly");
    // req.logger.http("Prueba de http");
    
    res.send({ message: "Prueba de logger!!" });
});
module.exports={
    loggerRouter
}