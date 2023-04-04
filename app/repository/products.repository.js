class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    create = async(user) =>{
        const cart = await this.dao.create(user);
        return cart;
    }
    getAll = async()=>{
        const result = await this.dao.read()
        return result;
    }
    
    getOneById = async (idProduct) => {
        const result = await this.dao.readOneById(idProduct);
        return result;
    }
}

module.exports={
    ProductsRepository
}