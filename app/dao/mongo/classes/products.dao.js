const { productModel } = require("../../mongo/models/products.model");

class productsDao{
    async paginate(query,page,limit,sort){
        try{
            let response ={};
            let nextPage;
            let prevPage;
            if (query!=null){
                if(!sort){
                    response = await productModel.paginate({category:`${query}`},{page:`${page}`, limit:`${limit}`, lean:true});
                }else{
                    response = await productModel.paginate({category:`${query}`},{sort:{price:`${sort}`},page:`${page}`, limit:`${limit}`, lean:true});
                }
                nextPage = `http://localhost:8080/products?category=${query}&page=${+page+1}&limit=${limit}&sort=${sort}`;
                prevPage = `http://localhost:8080/products?category=${query}&page=${+page-1}&limit=${limit}&sort=${sort}`;
            }else{
                if(!sort){
                    response = await productModel.paginate({},{page:`${page}`, limit:`${limit}`, lean:true});
                }else{
                    response = await productModel.paginate({},{sort:{price:`${sort}`},page:`${page}`, limit:`${limit}`, lean:true});
                }
                nextPage = `http://localhost:8080/products?page=${+page+1}&limit=${limit}&sort=${sort}`;
                prevPage = `http://localhost:8080/products?page=${+page-1}&limit=${limit}&sort=${sort}`;
            }
            const responseServer = {...response}
            responseServer.status="Succes";
            if(responseServer.hasNextPage){
                responseServer.nextLink=nextPage;
            }else{responseServer.nextLink=null}
            if(responseServer.hasPrevPage){
                responseServer.prevLink=prevPage;
            }else{responseServer.prevLink=null}
            return(responseServer);
            
        }catch(err){
            throw err;
        }
    }
    async readOneById(id){
        const response = await productModel.findById(id);
        return response;
    }
    async save(newProduct){
        await newProduct.save()
    }
    //------------
    async create(product, code) {
        try {
            const productFind = await productModel.find({code:`${code}`})
            if(!productFind.length){
                const newProduct = new productModel(product);
                return newProduct;
            }else{
                return false
            }
        } catch (err) {
            throw err;
        }
    }
    async delete(productId) {
        try {
            const result = await productModel.findByIdAndDelete(productId);
            return result;
        } catch (err) {
            throw err;
        }
    }
    async updateProduct(productId, product) {
        try {
            const result = await productModel.findByIdAndUpdate(productId, product);
            return result;
        } catch (err) {
            throw err;
        }
    }
}



module.exports = {
    productsDao,
    };