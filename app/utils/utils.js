const mongoose = require("mongoose");

//ENCRIPTADO CLAVES
const bcrypt = require("bcrypt");

//USO DE FAKER CREAR DATOS RANDOMS
const {faker} = require("@faker-js/faker");
faker.locale = "es";

//ENCRIPTADO CLAVES
const createHash = (password) => 
    bcrypt.hashSync(password,bcrypt.genSaltSync(10));
const isValidPassword = (passwordBody, passwordBD) =>
    bcrypt.compareSync(passwordBody, passwordBD);

    
//USO DE FAKER CREAR DATOS RANDOMS
const generateProduct = () =>{
    let randomProduct={
        title : faker.commerce.productName(),
        info:faker.commerce.productDescription(),
        code:faker.random.alphaNumeric(8),
        price:faker.datatype.number({ min: 10, max: 50000}),
        thumbnail:faker.random.alpha(10),
        stock:faker.datatype.number({ min: 1, max: 200}),
        category:faker.commerce.department(),
        status:faker.datatype.boolean()
    }
    return randomProduct;
}

module.exports = {
    createHash,
    isValidPassword,
    generateProduct
};
