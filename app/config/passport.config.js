const passport = require("passport");
const local = require("passport-local");
const { userModel } = require("../dao/mongo/models/users.model");
const { createHash, isValidPassword } = require("../utils/utils");
const GitHubStrategy = require("passport-github2");

//MANEJO DE ERRORES
const { CustomError } = require("../services/errors/CustomError");
const { generateUserErrorInfoLogin,generateUserErrorInfoSignUP,generateUserErrorEmailInUsed } = require("../services/errors/info");
const { EErrors } = require("../services/errors/enums");




const LocalStrategy = local.Strategy;
const initializePassport = () =>{
    passport.use("register", new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req,username,password,done) =>{
            const {first_name,last_name,email,age} = req.body;
            try{
                // FALTAN INGRESAR DATOS
                if(first_name === "undefined" || last_name === "undefined" || email === "undefined"|| password === "undefined" || age === "undefined"){
                    CustomError.createError({
                        name:"User SignUP Error",
                        cause:generateUserErrorInfoSignUP(first_name,last_name,email,age,password),
                        message:"Missing data entry",
                        code: EErrors.INVALID_TYPES_ERROR
                    })
                    //return done (null, false)
                }

                let user = await userModel.findOne({email:username});
                // EMAIL YA REGISTRADO
                if(user){
                    CustomError.createError({
                        name:"User SignUP Error",
                        cause:generateUserErrorEmailInUsed(email),
                        message:"Email already REGISTERED",
                        code: EErrors.INVALID_TYPES_ERROR
                    })
                    // return done (null, false)
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password:createHash(password),
                    role:'user'
                }
                let result = await userModel.create(newUser);
                return done(null,result);
            }catch(error){
                return done(error);
            }
        }))

    passport.use("login", new LocalStrategy({usernameField:'email'},async(username,password,done)=>{
        try{
            //VALIDAR QUE NO FALTAN INGRESAR DATOS
            if(username==="undefined" || password==="undefined"){
                CustomError.createError({
                    name:"User Loggin Error",
                    cause:generateUserErrorInfoLogin(username,password),
                    message:"Missing data entry:",
                    code: EErrors.INVALID_TYPES_ERROR
                })
            }
            //VALIDAR QUE EL MAIL EXISTA
            const user = await userModel.findOne({email:username})
            if(!user){
                CustomError.createError({
                    name:"User Loggin Error",
                    cause:generateUserErrorInfoLogin(username,password),
                    message:"Email NOT FOUND",
                    code: EErrors.INVALID_TYPES_ERROR
                })
                //return done(null, false);
            }
            //VALIDAR QUE LA CONTRASEÑA SEA LA CORRECTA
            if(!isValidPassword(password,user.password)){
                CustomError.createError({
                    name:"User Loggin Error",
                    cause:generateUserErrorInfoLogin(username,password),
                    message:"Password INCORRECT",
                    code: EErrors.INVALID_TYPES_ERROR
                })
            }else{
                return done(null,user);
            }
        }catch(error){
            return done(error);
        }
    }))

    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.2911d2a81d622cd1',
        clientSecret:'00eac46094e36c6e711c4e542d88ff10eab837e7',
        callbackURL: 'http://localhost:8080/api/login/githubcallback'
    },async (accessToken, refreshToken, profile, done)=>{
        try{
            let user = await userModel.findOne({email:profile._json.email});
            if(!user){
                let newUser = {
                    first_name:profile._json.name || "gitHubName",
                    last_name:'GitHub',
                    age:'',
                    email:profile._json.email || profile._json.id,
                    password:'',
                    role:'user'
                }
                let result = await userModel.create(newUser);
                done (null,result)
            }else{
                done(null, user)
            }
        }catch(error){
            return done(error)
        }
    }))
    passport.serializeUser((user, done)=>{
        done(null,user._id);
    });
    passport.deserializeUser(async(id,done)=>{
        let user = await userModel.findById(id);
        done(null,user)
    });
}
module.exports={
    initializePassport,
}