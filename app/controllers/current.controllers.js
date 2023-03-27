const showDataUserSession = async(req,res)=>{
    try{
        res.status(200).json(req.session.user);
    }catch(err){
        throw err
    }
}
module.exports = {
    showDataUserSession,
};
