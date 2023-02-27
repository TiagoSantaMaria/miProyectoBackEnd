console.log("Se conecto");

const addLoggin = document.getElementById("login");
addLoggin.addEventListener("click",async (e)=>{
    console.log("Boton apretado");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email);
    console.log(password);
    await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email,password})
        })
})