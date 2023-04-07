const mongoose = require("mongoose");

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
    // code: {
    //     type: String,
    //     // unique: true,
    // },
    code:String,
    purchase_datetime: Date,
    amount: Number,
    purchaser: String,
});

const ticketModel = mongoose.model(ticketCollection, ticketSchema);

module.exports={
    ticketModel
};