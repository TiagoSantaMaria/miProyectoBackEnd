const { UserRepository } = require("../repository/users.repository");
const { usersDao } = require("../dao/mongo/classes/users.dao");
const memoryUsersDao = new usersDao;
const userRepository = new UserRepository(memoryUsersDao);

const { createHash } = require("../utils/utils");

const createUser = async(req,res)=>{
    const { first_name, last_name, email, password, age } = req.body;
    try {
        if(!first_name || !last_name || !email || !password || !age){
            res.status(400).send({message: "unsuccess"})
        }
        let user ={
            first_name,
            last_name,
            email,
            password:createHash(password),
            age,
            role:'user'
        };
        console.log(user);
        const newUser = await userRepository.createUser(user);
        console.log(newUser);
        res.status(201).json({ message: "success", data: user });
    } catch (error) {
        res.status(500).json({ error: error.message });
        }
}
module.exports = {
    createUser
};
