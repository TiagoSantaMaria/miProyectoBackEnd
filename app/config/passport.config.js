const passport = require("passport");
const local = require("passport-local");
const { userModel } = require("../data/models/users.model");
const { createHash, isValidPassword } = require("../utils");
const GitHubStrategy = require("passport-github2")

const LocalStrategy = local.Strategy;
const initializePassport = () =>{
    passport.use("register", new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req,username,password,done) =>{
            const {first_name,last_name,email,age} = req.body;
            try{
                if(!first_name || !last_name || !email || !password || !age){
                    // FALTAN INGRESAR DATOS
                    return done (null, false)
                    // return done("FALTAN INGRESAR DATOS");
                }
                let user = await userModel.findOne({email:username});
                if(user){
                    // EMAIL YA REGISTRADO
                    return done (null, false)
                    // return done("EMAIL YA REGISTRADO");
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
                return done("ERROR AL OBTENER EL USUARIO: "+error)
            }
        }))
    passport.use("login", new LocalStrategy({usernameField:'email'},async(username,password,done)=>{
        try{
            const user = await userModel.findOne({email:username})
            if(!user){
                return done(null, false);
            }
            if(!isValidPassword(password,user.password)){
                return done(null, false)
            }else{
                return done(null,user);
            }
        }catch(err){
            return done(err);
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