const { UsersDTO } = require("../dao/dto/users.dto");


const showDataUserSession = async(req,res)=>{
    try{
        const userDto = new UsersDTO(req.session.user)
        res.status(200).json(userDto);
    }catch(err){
        throw err
    }
}
module.exports = {
    showDataUserSession,
};
