const { userModel } = require("../data/models/users.model");

class usersDao{
    async readById(userEmail){
        try{
            const user = await userModel.findOne({email:userEmail});
            return user;
        }catch(err){
            throw new err
        }
    }
}


module.exports = {
    usersDao,
    };