const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/dbTest', {useNewUrlParser: true});
const connection  = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established succesfully");
})

//databse schema for users
var creditCard = new schema({

    email: {
        type: String,
        required: true
    },
    bookingDate: {
        type: String,
        default: Date.now
    },
    total: {
        type: String,
        required: true
    },
    subtotal: {
        type: String,
        required: true
    }
});


mongoose.model('CardPay', creditCard);
module.exports = mongoose;