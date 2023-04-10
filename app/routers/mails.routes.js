const express = require("express");


// GENERO EL ROUTER
const mailsRouter = express.Router();

const nodemailer = require("nodemailer");

//IMPORTO MIDDLEWARE DE AUTENTICACION
const { authUser } = require("./middlewares");

const transport = nodemailer.createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:'tiagosantamaria01@gmail.com',
        pass:'eqmysdihevxzeovq'
    }
})

mailsRouter.post('/',authUser, async(req,res)=>{
    try{
        let result = await transport.sendMail({
            from:'Tiago SANTA MARIA <tiagosantamaria01@gmail.com>',
            to:`${req.session.user.email}`,
            subject:'Prueba Compra',
            html:`
            <div>
                <h1>GRACIAS POR SU COMPRA!</h1>
            </div>
            `,
            attachments:[]
        })
        res.status(201).json({message:"succes"})
    }catch(err){
        res.status(500).json({message:"unsucces"})
    }
})

module.exports={
    mailsRouter
}