//IMPORTO DAO NEESARIOS
const { productsDao } = require("../dao/products.dao");
const memoryProductsDao = new productsDao;

const { ProductManagerDB } = require("../data/classes/DBManager");
const productManager = new ProductManagerDB;

const showProducts = async(req,res) =>{
    try {
        const {category = null} = req.query;
        const {page = 1} = req.query;
        const {limit = 10} = req.query;
        const {sort = null} = req.query;
        const response = await memoryProductsDao.paginate(category,page,limit,sort)
        res.status(200).send(response)
    } catch (err) {
        res.status(500).send(err.message);
    }
}
const showProductById = async(req,res)=>{
    try{
        const {pid=null} = req.params;
        if(!!pid){
            const productById = await memoryProductsDao.readOneById(pid);
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
            res.status(400).send({ error: "Faltan datos" });
            return
        }
        const product = {title, info, code, price, thumbnail, stock, category,  status};
        const newProduct = await productManager.create(product, code);
        if(!!newProduct){
            memoryProductsDao.save(newProduct);
            res.status(200).send({ message: "Producto creado", product});
        }else{
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
        if(await productManager.updateProduct(pid, updateProduct)){
            res.status(200).send("Producto Actualizado!");
        }else{
            res.status(400).send("El Producto No Pudo Ser Actualizado!");
        }
    }
}
const deleteProduct = async(req,res)=>{
    const { pid } = req.params;
    try {
        const result = await productManager.delete(pid);
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