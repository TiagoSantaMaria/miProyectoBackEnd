const { cartModel } = require("../models/carts.model");
const { userModel } = require("../models/users.model");
class usersDao{
    async readById(userEmail){
        try{
            const user = await userModel.findOne({email:userEmail});
            return user;
        }catch(err){
            throw new err
        }
    }
    //------------
    async addCartToUser(email, idCart){
        try{
            const cart = await cartModel.findById(idCart)
            const user = await userModel.find({email});
            user[0].carts.push({cart:`${cart._id}`});
            await userModel.findByIdAndUpdate(user[0]._id,user[0]);
            //MUESTRA QUE EL POPULATE ANDA BIEN
            // let userWant = await userModel.findOne({_id:`${user[0]._id}`})
            // console.log(JSON.stringify(userWant,null,'\t'));
        }catch(err){
            throw err
        }
    }
}


module.exports = {
    usersDao,
    };