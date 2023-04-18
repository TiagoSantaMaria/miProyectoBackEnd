const generateUserErrorInfo = (user)=>{
    return `Problemas de ingreso de datos.
    *USERNAME:${user.username}
    *PASSWORD:${user.password}`
}
module.exports={
    generateUserErrorInfo
}