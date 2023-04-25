//PATRON REPOSITORY
const { ProductsRepository } = require("../repository/products.repository");

//IMPORTO DAO NEESARIOS
const { productsDao } = require("../dao/mongo/classes/products.dao");
const memoryProductsDao = new productsDao;
const productsRepository = new ProductsRepository(memoryProductsDao);

const showProducts = async(req,res) =>{
    try {
        const {category = null} = req.query;
        const {page = 1} = req.query;
        const {limit = 10} = req.query;
        const {sort = null} = req.query;
        const response = await productsRepository.paginate(category,page,limit,sort)
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send(err.message);
    }
}
const showProductById = async(req,res)=>{
    try{
        const {pid=null} = req.params;
        if(!!pid){
            const productById = await productsRepository.getOneById(pid);
            if(!productById)res.status(400).send(`El producto con id:${pid} no se encuentra registrado`);
            if(!!productById)res.status(200).send(productById);
        }else{
            res.status(400).send("PRODUCT NOT FOUND")
        }
    }catch(err){
        res.status(500).send(err.message);
    }
}
const addNewProduct = async(req,res)=>{
    const {title, info, code, price, thumbnail, stock, category,  status} = req.body;
    try {
        if (!title || !info || !code || !price || !thumbnail || !stock || !category || !status){
            req.logger.error("Faltan datos del producto!");
            res.status(400).send({ error: "Faltan datos" });
            return
        }
        const product = {title, info, code, price, thumbnail, stock, category,  status};
        const newProduct = await productsRepository.create(product, code);
        if(!!newProduct){
            productsRepository.save(newProduct);
            req.logger.info("Producto creado!");
            res.status(200).send({ message: "Producto creado", product});
        }else{
            req.logger.error("El Codigo del producto esta en uso vigente!");
            res.status(400).send({ error: "El Codigo del producto esta en uso vigente!" });
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}
const modifyProduct = async(req,res)=>{
    const {pid=null} = req.params;
    if(!!pid){
        const updateProduct = req.body;
        //El signo + sobre id es para transformarlo en number
        if(await productsRepository.updateProduct(pid, updateProduct.productModify)){
            req.logger.info("successChange!");
            res.status(200).send({ message: "successChange" });
        }else{
            req.logger.error("El Producto No Pudo Ser Actualizado!");
            res.status(400).send("El Producto No Pudo Ser Actualizado!");
        }
    }
}
const deleteProduct = async(req,res)=>{
    const { pid } = req.params;
    try {
        const result = await productsRepository.delete(pid);
        req.logger.info("Producto eliminado!");
        res.status(200).send({ message: "Producto eliminado", result });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports = {
    showProducts,
    showProductById,
    addNewProduct,
    modifyProduct,
    deleteProduct
}