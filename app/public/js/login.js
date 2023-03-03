const addLoggin = document.getElementById("login");
addLoggin.addEventListener("click",async (e)=>{
    console.log("Boton apretado");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password})
        })
        .then((res)=>res.json())
        .then((data)=>
            data.message ==="success"?(window.location.href="/products"):alert("Algo ha pasado"))
        .catch((err)=>console.log(err))
})