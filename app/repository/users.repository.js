class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createUser = async(user)=>{
    
    const newUser = await this.dao.createUser(user); 
    return newUser;
  }

  getOneById = async (idUser) => {
    const result = await this.dao.readById(idUser);
    return result;
  };
  addCartToUser = async (mail,idCart) => {
    await this.dao.addCartToUser(mail,idCart);
  };
}

module.exports={
  UserRepository
}