console.log("Se conecto el js");

let carts = {};
let myCart = []

const agregarAlCarrito = async (id,nombre,precio) =>{
    let myProducts={};
    let find=false;
    let productAdd=false;

    if(myCart.length===0){
        await fetch("http://localhost:8080/api/carts", {
                method: "POST",
            headers: {
                "Content-Type": "application/json",
            }})

            //ME TRAE EL CARRITO CREAO(AHORA ANDA BIEN PERO MAS ADELANTE NO)
            const petition = await fetch('http://localhost:8080/api/carts');
            carts = await petition.json();
            console.log(carts[carts.length-1]);
            //AGREGO EL PRODUCTO AL CARRITO
            myProducts.quantity = 0;
            myProducts.id = id;
            myCart.push(myProducts);
        }
    if(myCart.length!==0){
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
    }
    await fetch(`http://localhost:8080/api/carts/${carts[carts.length-1]._id}/product/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id,nombre,precio})
    })
    console.log(myCart)
}

const cerrarSession = async() =>{
    await fetch('http://localhost:8080/profile',{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
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
