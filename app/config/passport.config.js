const passport = require("passport");
const local = require("passport-local");
const { userModel } = require("../data/models/users.model");
const { createHash, isValidPassword } = require("../utils");

const LocalStrategy = local.Strategy;
const initializePassport = () =>{
    passport.use("register", new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req,username,password,done) =>{
            const {first_name,last_name,email,age} = req.body;
            try{
                if(!first_name || !last_name || !email || !password || !age){
                    // FALTAN INGRESAR DATOS
                    return done("FALTAN INGRESAR DATOS");
                }
                let user = await userModel.findOne({email:username});
                if(user){
                    // EMAIL YA REGISTRADO
                    return done("EMAIL YA REGISTRADO");
                }
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password:createHash(password)
                }
                let result = await userModel.create(newUser);
                return done(null,result);
            }catch(error){
                return done("ERROR AL OBTENER EL USUARIO: "+error)
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