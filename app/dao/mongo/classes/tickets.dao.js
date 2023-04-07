const { ticketModel } = require("../models/tickets.model");

class ticketDao{
    async create(email,totalPurchase){
        try{
            const ticket = new ticketModel()
            ticket.code="5";
            let today = new Date();
            ticket.purchase_datetime=today.toLocaleString('en-US');
            ticket.amount=totalPurchase;
            ticket.purchaser=email;
            ticket.save();
            return ticket;
        }catch(err){

        }
    }
}

module.exports = {
    ticketDao,
    };

//Crea un nuevo objeto `Date`
// var today = new Date();
// obtener la fecha de hoy en formato `MM/DD/YYYY`
// var now = today.toLocaleDateString('en-US');
// console.log(now);
// /*
//     Resultado: 1/27/2020
// */