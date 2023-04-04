class usersDTO{
    constructor(user){
        //DATON NO SENSIBLES
        this._id=user._id;
        this.name = user.first_name + " " + user.last_name;
        this.age = user.age
        this.role=user.role
    }
}
module.exports = {
    usersDTO
}