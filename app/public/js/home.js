console.log("Se conecto el js");
//CALCULA EL PRECIO DE LA COMPRA DE PRODUCTOS CON STOCK Y LO RETORNA
const calculateTotalPrice = (listProduct)=>{
    let totalPrice=0;
    listProduct.map((product)=>{
        if(product.quantity<=product.stock){
            totalPrice+=product.quantity*product.price;
        }
    })
    return totalPrice;
}
//CONTROLA STOCKY DEVUELVE AQUELLOS PRODUCTOS LOS CUALES LA DEMANDA SUPERA EL STOCK
const controlStock = (listProduct)=>{
    let productsOut = []
    let productsIn = []
    listProduct.map((product)=>{
        if(product.quantity>product.stock){
            productsOut.push(product);
        }else{
            productsIn.push(product);
        }
    })
    productsIn.forEach(async(product)=>{
        let productModify={};
        productModify.stock=product.stock-product.quantity;
        console.log(productModify);
        await fetch(`http://localhost:8080/api/products/${product.idProduct}`, {
            method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body:JSON.stringify({productModify})
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.message ==="successChange"){
                alert(`${product.name} TIENE STOCK SUFICIENTE`);
            }
        })
        .catch((err)=>console.log(err))
    })
    return productsOut;
}

let carts = {};
let myCart = [];

const agregarAlCarrito = async (id,name,precio,stock) =>{
    let myProducts={};
    let find=false;
    if(myCart.length===0){
            //AGREGO EL PRODUCTO AL CARRITO
            myProducts.idProduct = id;
            myProducts.name = name;
            myProducts.price = precio;
            myProducts.stock = stock;
            myProducts.quantity = 0;
            myCart.push(myProducts);
        }
    if(myCart.length!==0){
        myCart.map((prod)=>{
            if(prod.idProduct===id){
                prod.quantity++;
                find=true;
            }
        })
        if(find===false){
            myProducts.idProduct = id;
            myProducts.name = name;
            myProducts.price = precio;
            myProducts.stock = stock;
            myProducts.quantity = 1;
            myCart.push(myProducts);
        }
    }
}

const cerrarSession = async() =>{
    await fetch('http://localhost:8080/api/profile',{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
    .then((res)=>res.json())
    .then((data)=>
        data.message ==="success"?(window.location.href="/login"):alert("Algo ha pasado"))
    .catch((err)=>console.log(err))
}

const confirmarCompra = async() =>{
    console.log(myCart)
    //CREA EL CARRITO
    await fetch("http://localhost:8080/api/carts", {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
    }})

    //ME TRAE EL CARRITO CREADO
    const petition = await fetch('http://localhost:8080/api/carts');
    carts = await petition.json();

    //ACTUALIZO EL CARRITO CON LOS PRODS DEL CARRITO
    await fetch(`http://localhost:8080/api/carts/${carts[carts.length-1]._id}`, {
        method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body:JSON.stringify({myCart})
    })

    idCart = carts[carts.length-1]._id;

    //CONTROLO STOCK
    productosSinStock = controlStock(myCart);
    if (productosSinStock.length!==0){
        productosSinStock.forEach((product)=>{
            alert(`${product.name} NO TIENE STOCK SUFICIENTE, POR LO QUE NO SE AGREGO AL PROCESO DE COMPRA`);
        })
    }
    
    //CALCULO PRECIO DE LA ORDEN
    const totalPrice = calculateTotalPrice(myCart);

    //CREO EL TICKET
    await fetch(`http://localhost:8080/api/carts/${idCart}/purchase`,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({totalPrice})
    })

    //ASIGNO CARRITO AL USUARIO // CUANDO CREO EL CARRO SE LE ASIGNA EL ID DEL USER
    await fetch(`http://localhost:8080/api/profile`, {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body:JSON.stringify({idCart})
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data.message ==="success"){
            alert("Compra Registrada");
            carts = {};
        }else{
            alert("Algo ha pasado")
        }
    })
    .catch((err)=>console.log(err))

    await fetch(`http://localhost:8080/api/mail`, {
        method: "POST",
    headers: {
        "Content-Type": "application/json",
    }})

    myCart = productosSinStock;
    console.log(myCart);
}


//ARREGLAS A FUTURO 
/*
(TIP 1 YA LO ARREGLE)
1)SUELE PASAR QUE CUANDO AGREGO UN PRODUCTO POR PRIMERA VEZ, Y CREO EL CART,
CUANDO EJECUTO EL GET CON EL FETCH NO ME LO TRAE, SINO QUE ME TRAE EL ANTERIOR AL CREADO
RECIENTEMENTE, PARECIERA QUE EL AWAIT A VECES NO FRENA LA EJECUCION PARCIAL DEL CODIGO
2)SI HAGO DOBLE/TRIPLE/ETC CLICK RAPIDOS SOBRE EL BOTON DE AGREGAR PRODUCTO, EL QUANTITY
EN LA BASE DE DATOS NO SE ACTUALIZA
IGUAL ESTO ULTIMO NO SERIA OPTIMO QUE SE ACTUALICE TODO EL TIEMPO EN LA BASEDE DATOS, 
LO HICE A MODO DE PRUEBA, SERIA MEJOR QUE SE GUARDE CUANDOSE CONFIRMARA LA COMPRA,
Y MIENTRAS IR GUARDANDOLO EN EL LOCALSTORAGE
*/
