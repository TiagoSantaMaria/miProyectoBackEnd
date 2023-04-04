const { usersDao } = require("../dao/mongo/classes/users.dao");
const memoryUsersDao = new usersDao;


const addCartToUser = async(req,res) =>{
    const {idCart} = req.body;
    try{
        memoryUsersDao.addCartToUser(req.session.user.email,idCart);
        res.status(200).json({message:"success"})
    }catch(err){
        throw err
    }
}
const deleteSession = async(req,res)=>{
    try{
        req.session.destroy();
        res.clearCookie('email');
        res.clearCookie('password');
        res.status(201).json({ message: "success" });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    addCartToUser,
    deleteSession
}