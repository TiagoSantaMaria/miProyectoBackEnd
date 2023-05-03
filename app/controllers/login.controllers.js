const { UserRepository } = require("../repository/users.repository");
const { usersDao } = require("../dao/mongo/classes/users.dao");

const { isValidPassword } = require("../utils/utils");


const memoryUsersDao = new usersDao;
const userRepository = new UserRepository(memoryUsersDao);

const findUserByEmail = async(req,res)=>{
    const { email, password } = req.body;
    try {
        const response = await userRepository.getOneById(email);
        if (response){
            if(!isValidPassword(password, response.password)){
                res.status(403).send({message: "Incorrect password"});
            }else{
                req.session.user=response;
                if(response.email==='tiago@gmail.com'){
                    req.session.user.admin=true;
                }else{
                    req.session.user.admin=false;
                }
                res.status(200).json({ message: "success", data: response });
            }
        }else{
            res.status(404).json({ message: "error", data: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports={
    findUserByEmail
}