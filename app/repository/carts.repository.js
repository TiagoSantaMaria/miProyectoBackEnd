class CartsRepository {
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
    
    getOneById = async (idCart) => {
        const result = await this.dao.readOneById(idCart);
        return result;
    }
    
    save = async(cart)=>{
        await this.dao.saveCart(cart);
    }

    cleanAllProductsInCart = async(cart)=>{
        await this.dao.cleanCart(cart);
    }

    addProductToCart = async(cart,product,quantity)=>{
        await this.dao.addProductToCart(cart,product,quantity);
    }
    updateQuantityProducts = async(cart,product,quantity)=>{
        await this.dao.updateQuantityProducts(cart,product,quantity);
    }
    deleteTotalProduct = async(cart,product)=>{
        await this.dao.deleteTotalProduct(cart,product,quantity);
    }
}

module.exports={
    CartsRepository
}