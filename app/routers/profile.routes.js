const express = require("express");

// GENERO EL ROUTER
const profileRouter = express.Router();

const { addCartToUser,deleteSession } = require("../controllers/profile.controller");

profileRouter.post("/", addCartToUser)
profileRouter.delete("/", deleteSession)

module.exports={
    profileRouter
}