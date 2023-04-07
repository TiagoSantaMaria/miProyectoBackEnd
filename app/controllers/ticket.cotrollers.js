//DATA USER
const { UserRepository } = require("../repository/users.repository");
const { usersDao } = require("../dao/mongo/classes/users.dao");
const memoryUsersDao = new usersDao;
const userRepository = new UserRepository(memoryUsersDao);

//DATA TICKET
const { TicketRepository } = require("../repository/tickets.repository");
const { ticketDao } = require("../dao/mongo/classes/tickets.dao");
const memoryTicketDao = new ticketDao;
const ticketRepository = new TicketRepository(memoryTicketDao)


// const createTicket = async() =>{
//     try{
//         const user = await userRepository.getOneById(req.session.user.email);
//         const ticket = await ticketRepository.create(user.email);
//     }catch(err){

//     }
// }
