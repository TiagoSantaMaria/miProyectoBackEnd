// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const currentRouter = express.Router();

const { showDataUserSession } = require("../controllers/current.controllers");

// IMPORTO MIDDLEWARE
const {authProfile} = require("./middlewares")


currentRouter.get("/",authProfile,showDataUserSession)

module.exports = {
    currentRouter,
};
