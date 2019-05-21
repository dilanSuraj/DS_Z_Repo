const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/dbTest', {useNewUrlParser: true});
const connection  = mongoose.connection;

connection.once('open', function(){
    console.log("MongoDB database connection established succesfully");
})

//databse schema for users
var User = new schema({ 
     
    name: {
        type: String,
        required: true
    },
    email : {
        type:String,
        required: true,
        unique : true
    },
    password:{
        type: String, 
        required: true
    },
    mobileNo:{
        type: String,
        required: true
    },
    NIC:    {
        type: String,
        required: true
    }
});
mongoose.model('identifiers', User);
module.exports = mongoose;




