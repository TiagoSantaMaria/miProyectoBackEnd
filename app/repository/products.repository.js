class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    create = async(product, code) =>{
        const cart = await this.dao.create(product, code);
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
    paginate = async (category,page,limit,sort) =>{
        const result = await this.dao.paginate(category,page,limit,sort);
        return result;
    }
    save = async(newProduct) =>{
        const result = await this.dao.save(newProduct);
        return result;
    }
    updateProduct = async(pid, updateProduct) =>{
        const result = await this.dao.updateProduct(pid, updateProduct);
        return result;
    }
    delete = async(pid) =>{
        const result = await this.dao.delete(pid);
        return result;
    }
}

module.exports={
    ProductsRepository
}