const generateUserErrorInfo = (username,password)=>{
    const message =  `Problemas de ingreso de datos:
        *USERNAME:${username}
        *PASSWORD:${password}`;
        return message;
}
module.exports={
    generateUserErrorInfo
}