const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/dbTest', {useNewUrlParser: true});
const connection  = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established succesfully");
})


//databse schema for users
var tickets = new schema({

    ticketName: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    depaTime: {
        type: String,
        required: true
    },
    noOfSeat:{
        type: Number,
        required: true
    },
    remain: {
        type: Number
    }
});


mongoose.model('Tickets', tickets);
module.exports = mongoose;