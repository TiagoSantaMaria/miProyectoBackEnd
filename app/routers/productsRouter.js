// IMPORTO MODULO EXPRESS
const express = require("express");

// GENERO EL ROUTER
const productsRouter = express.Router();

//INICIALIZACION DE CLASE MASTER
const { ProductManagerDB } = require("../data/classes/DBManager");
const productManager = new ProductManagerDB;


//ENDPOINTS

// Endpoint para filtrar productos dependiendo el limite q se quiera mostrar 
productsRouter.get("/", async (req, res) => {
    try {
        const {category = null} = req.query;
        const {page = 1} = req.query;
        const {limit = 10} = req.query;
        const {sort = null} = req.query;
        const response = await productManager.paginate(category,page,limit, sort);
        res.send(response)
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Endpoint para filtrar productos dependiendo el limite q se quiera mostrar 
// productsRouter.get("/", async (req, res) => {
//     try {
//         const {limit = null} = req.query;
//         if (!limit){
//             const product = await productManager.read();
//             res.send({ productos: product });
//         }else{
//             const product = await productManager.read(limit);
//             res.send({ productos: product });
//         }
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// Endpoint para filtrar producto dependiento el id pasado porametro
productsRouter.get("/:pid", async (req,res) => {
    try{
        const {pid=null} = req.params;
        if(!!pid){
            const productsById = await productManager.readOneByID(pid);
            if(!productsById)res.status(400).send(`El producto con id:${pid} no se encuentra registrado`);
            if(!!productsById)res.status(200).send(productsById);
        }   
    }catch(err){
        throw err;
    }
});

// Endpoint para agregar un producto nuevo
productsRouter.post("/", async (req, res) => {
        const {title, info, code, price, thumbnail, stock, category,  status} = req.body;
        if (!title || !info || !code || !price || !thumbnail || !stock || !category || !status){
            res.status(400).send({ error: "Faltan datos" });
            return;
        }
        try {
            const product = {title, info, code, price, thumbnail, stock, category,  status};
            if(await productManager.create(product, code)){
                req.socket.emit("newProduct", product);
                res.status(200).send({ message: "Producto creado", product});
            }else{
                res.status(400).send({ error: "El Codigo del producto esta en uso vigente!" });
            }
        } catch (err) {
            res.status(500).send(err.message);
        }
});

// Endpoint para modificar un producto nuevo
productsRouter.put("/:pid", async(req,res)=>{
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
});
// Endpoint para eliminar un producto
productsRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const result = await productManager.delete(pid);
        res.status(200).send({ message: "Producto eliminado", result });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

//Exportar modulo
module.exports = {
    productsRouter,
    };








//CUANDO USABA FILESYSTEM

// //INICIALIZACION DE CLASE MASTER
// const {ProductManager} = require("..");
// const productManager = new ProductManager("../database/products.json");

// //Endpoint para filtrar productos dependiendo el limite q se quiera mostrar 
// productsRouter.get("/", async (req,res)=>{
//     const {limit = null} = req.query;
//     const products = await productManager.getProduct();
//     if (!limit) res.send(products);
//     if (!!limit){
//         const newListProducts = [];
//         for(let i=0; i<limit;i++){
//             newListProducts[i] = products[i];
//         }
//         res.status(200).send(newListProducts);
//     }
// });

// //Endpoint para filtrar producto dependiento el id pasado porametro
// productsRouter.get("/:id", async (req,res) => {
//     const {id=null} = req.params;
//     if(!!id){
//         const productsById = await productManager.getProductById(Number(id));
//         if(!productsById)res.status(400).send(`El producto con id:${id} no se encuentra registrado`);
//         if(!!productsById)res.status(200).send(productsById);
//     }
// });

// //Endpoint para agregar un producto nuevo
// productsRouter.post("/", async (req,res) => {
//     const newProduct = req.body;
//     if(!!newProduct){
//         if(await productManager.addProduct(newProduct)){
//             req.socket.emit("newProduct", newProduct);
//             res.status(200).send("Producto Agregado!");
//         }else{
//             res.status(400).send("El Producto No Pudo Ser Agregado!");
//         }
//     }else{
//         res.status(400).send("Por Favor ingrese un Producto");
//     }
// });

// //Endpoint para modificar un producto nuevo
// productsRouter.put("/:id", async(req,res)=>{
//     const {id=null} = req.params;
//     if(!!id){
//         const updateProduct = req.body;
//         //El signo + sobre id es para transformarlo en number
//         if(await productManager.updateProduct(+id, updateProduct)){
//             res.status(200).send("Producto Actualizado!");
//         }else{
//             res.status(400).send("El Producto No Pudo Ser Actualizado!");
//         }
        
//     }
// });

// //Endpoint para eliminar un producto
// productsRouter.delete("/:id", async (req,res)=>{
//     const {id=null} = req.params;
//     if(!!id){
//         if(await productManager.deleteProduct(+id)){
//             res.status(200).send("Producto Eliminado!");
//         }else{
//             res.status(400).send("El Producto No Pudo Ser Eliminado!")
//         }
//     }
// });