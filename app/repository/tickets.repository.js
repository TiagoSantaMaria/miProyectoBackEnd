class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getOneById = async(idTicket)=>{
        const result = await this.dao.readById(idTicket);
        return result;
    };
    create = async(email,totalPurchase)=>{
        const result = await this.dao.create(email,totalPurchase);
        return result;
    }
}
module.exports={
    TicketRepository
}