console.log("Se conecto el js");

let myCart = []
const agregarAlCarrito = (id,nombre,precio) =>{
    let myProducts={};
    let find=false;
    myCart.map((prod)=>{
        if(prod.id===id){
            prod.quantity++;
            find=true;
        }
    })
    if(find===false){
        myProducts.quantity = 1;
        myProducts.id = id;
        myCart.push(myProducts);
    }
    console.log(myCart)
    $.ajax({
        method:'POST',
        url:'http://localhost:8080/api/carts',
        data:{id:id,nombre:nombre,precio:precio}
    });
}
