console.log("Conectado")

const addLoggin = document.getElementById("signup");
addLoggin.addEventListener("click",async (e)=>{
    console.log("Boton apretado");
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;

    await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({first_name,last_name,email,password,age})
        })
})