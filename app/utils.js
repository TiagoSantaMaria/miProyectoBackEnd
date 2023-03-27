const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const createHash = (password) => 
    bcrypt.hashSync(password,bcrypt.genSaltSync(10));

const isValidPassword = (passwordBody, passwordBD) =>
    bcrypt.compareSync(passwordBody, passwordBD);

module.exports = {
    createHash,
    isValidPassword,
};
