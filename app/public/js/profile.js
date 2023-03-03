console.log("Se Conecto")
const cerrarSession = async() =>{
    await fetch('http://localhost:8080/profile',{
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