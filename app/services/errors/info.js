const generateUserErrorInfoLogin = (username,password)=>{
    const message =  `problems with data:
        *USERNAME:${username}
        *PASSWORD:${password}`;
        return message;
}
const generateUserErrorInfoSignUP = (name,lastName,email,edad,contraseña)=>{
    const message =  `problems with data:
        *NAME:${name}
        *LASTNAME:${lastName}
        *EMAIL:${email}
        *AGE:${edad}
        *PASSWORD:${contraseña}`;
        return message;
}
const generateUserErrorEmailInUsed = (email)=>{
    const message =  `problems with EMAiL: ${email} is already in used`;
        return message;
}
module.exports={
    generateUserErrorInfoLogin,
    generateUserErrorInfoSignUP,
    generateUserErrorEmailInUsed
}