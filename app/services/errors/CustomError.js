class CustomError{
    static createError({name,cause,message,code=1}){
        const error = new Error(name,message,cause,code);
        error.name=name;
        error.message=message + ", "+ cause;
        error.code=code;
        throw error;
        
    }
}
module.exports={
    CustomError
}