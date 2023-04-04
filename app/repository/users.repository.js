class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  getOneById = async (idUser) => {
    const result = await this.dao.readById(idUser);
    return result;
  };

}

module.exports={
  UserRepository
}