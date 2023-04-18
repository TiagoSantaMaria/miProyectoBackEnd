//IMPORTS
const mongoose = require("mongoose");

//IMPORTS PARA USAR SESSION DE MONGO Y COOKIES
const MongoStore = require('connect-mongo')
const session = require('express-session');
const cookieParser = require("cookie-parser");

// IMPORTAR PASSPORT
const passport = require("passport");
const { initializePassport } = require("./config/passport.config");

// IMPORTAR MODULO SIGN UP ROUTER
const { singupRouter } = require("./routers/signup.routes");
// IMPORTAR MODULO LOGIN ROUTER
const { loginRouter } = require("./routers/login.routes");
// IMPORTAR MODULO VIEWS ROUTER
const { viewsRouter } = require('./routers/views.routes');


// IMPORTO EL ROUTER NUEVO PATRON MVC
const { cartsRouter } = require("./routers/carts.routes");
const { productsRouter } = require("./routers/products.routes");
const { profileRouter } = require("./routers/profile.routes");
const { currentRouter } = require("./routers/current.routes");
const { mailsRouter } = require("./routers/mails.routes");
const { ticketsRouter } = require("./routers/tickets.routes");

//IMPORTO DOTENV Y SUS VARIABLES
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.SERVER_PORT || 8080;
console.log(PORT);
//Consultar porque no me toma el port en el app.listen
const DB_USER=process.env.USER_MONGO;
const DB_PASS=process.env.PASS_MONGO;
const DB_NAME=process.env.DB_MONGO;

//CONTS/VARS

// SETEAR SERVER
const express = require('express');
const app = express();

//SETEAR SOCKET
const {Server} = require('socket.io');

// LEVANTAR SERVER
const socketServer = new Server(app.listen(8080));

// SETEAR HANDLEBARSz
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

//CONFIGURACIONES SERVER
// DECLARO ESTATICA LA CARPETA PUBLIC
app.use(express.static("./public"));
// LINEAS DE CODIGO PARA EL MANEJO DE INFORMACION (VAN SIEMPRE)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MIDDLEWARES

// PARA AGREGAR SOCKET A REQ
app.use((req, res, next)=>{
    req.socket = socketServer;
    next();
});

//PARA MANEJO DE ERRORES
app.use((error,req,res,next)=>{
    console.log(error.cause);
    switch(error.code){
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status:"Error",error:error.name})
            break;
        default:
            res.send({status:"Error",error:"Unhandled error"})
    }
});

// PARA GUARDAR LA SESSION EN MONGO Y USAR COOKIES
app.use(cookieParser("CookieProtegida"));
app.use(session({
    store: MongoStore.create({
            mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@codercluster.gvuqwfs.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            ttl: 15,
        }),
        secret: "coderDB",
        resave: false,
        saveUninitialized: false,
    }))

//PASSPORT
initializePassport()
app.use(passport.initialize());
app.use(passport.session());

//ROUTERS

// LLAMO AL VIEWS ROUTER
app.use('/', viewsRouter);
app.use('/api/login',loginRouter);
//LLAMO AL SIGNUP ROUTER
app.use('/api/signup',singupRouter);

//LO NUEVO CON MVC
// LLAMO AL PRODUCTS ROUTER
app.use("/api/products", productsRouter);
// LLAMO AL CART ROUTER
app.use("/api/carts", cartsRouter);
//LLAMO AL PROFILE ROUTER
app.use('/api/profile', profileRouter);
//LLAMO AL CURRENT ROUTER
app.use('/api/current', currentRouter);
//LLAMO AL MAIL ROUTER
app.use('/api/mail', mailsRouter);

//LEVANTO SERVER SOCKET
socketServer.on('connection', (socket) =>{
    console.log("Cliente Conectado");
})

//LEVANTO BD
const environment = async () =>{
    await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@codercluster.gvuqwfs.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
}

environment();

//EJEMPLOS DE UTILIZACION DE SOCKET
    // socket.on('mensaje',(msj)=>{
    //     console.log(`Recibi un mensaje: ${msj}`);
    //     socket.emit('singlecast','mensaje singlecast');
    //     socket.broadcast.emit('broadcast','mensaje broadcast');
    //     socketServer.emit('multicast','mensaje multicast');
    // })

// mongoose.connect("mongodb+srv://tiagoSantaMaria:yosoy2001@codercluster.gvuqwfs.mongodb.net/usuarios3757?retryWrites=true&w=majority", (error)=>{
//     if(error){
//         console.log("Error al conectar la Basede Datos")
//     }
// })