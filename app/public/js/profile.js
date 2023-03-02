console.log("Se Conecto")
const cerrarSession = async() =>{
    await fetch('http://localhost:8080/profile',{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    })
}