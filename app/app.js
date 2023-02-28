//IMPORTS
const mongoose = require("mongoose");

const MongoStore = require('connect-mongo')
const session = require('express-session');
const cookieParser = require("cookie-parser");

// IMPORTAR MODULO SIGN UP ROUTER
const { singupRouter } = require("./routers/signupRouter");
// IMPORTAR MODULO LOGIN ROUTER
const { loginRouter } = require("./routers/loginRouter");
// IMPORTAR MODULO PRODUCT ROUTER
const { productsRouter } = require('./routers/productsRouter');
// IMPORTAR MODULO CART ROUTER
const { cartsRouter } = require('./routers/cartsRouter');
// IMPORTAR MODULO VIEWS ROUTER
const { viewsRouter } = require('./routers/viewsRouter');
//IMPORTO MIDDLEWARE
const { injectSocketMiddleWare } = require('./routers/middlewares');
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

// AGREGO SOCKET A REQ
app.use((req, res, next)=>{
    req.socket = socketServer;
    next();
});
app.use((req, res, next)=>{
    req.session = session;
    next();
});


//ROUTERS

// LLAMO AL VIEWS ROUTER
app.use('/', viewsRouter);
// LLAMO AL PRODUCTS ROUTER
app.use('/api/products', productsRouter);
// LLAMO AL CART ROUTER
app.use('/api/carts', cartsRouter);
//LLAMO AL LOGIN ROUTER
app.use('/login',loginRouter);
//LLAMO AL SIGNUP ROUTER
app.use('/signup',singupRouter);


// MIDDLEWARE PARA GUARDAR LA SESSION EN MONGO
app.use(session({
        store: MongoStore.create({
            mongoUrl: `mongodb+srv://${DB_USER}:${DB_PASS}@codercluster.gvuqwfs.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
            mongoOptions: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            ttl: 120,
        }),
        secret: "eApp",
        resave: false,
        saveUninitialized: false,
    }))


//LEVANTO SERVER
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