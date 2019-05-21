var express = require('express');
var train = express.Router();

const dbUser = require('../modelsC/dbTickets');
var ticketsT = dbUser.model('Tickets');


//adding new train details 
train.route('/add').post(function(req, res){
    var addTicket = new ticketsT({
        ticketName: req.body.ticketName,
        from : req.body.from, 
        to: req.body.to, 
        price: req.body.price,
        arrivalTime   : req.body.arrivalTime,
        depaTime: req.body.depaTime, 
        noOfSeat: req.body.noOfSeat,
        remain   : req.body.remain
    }); 
    addTicket.save()
        .then(() =>{
            res.status(200).json({'tickets': 'Added successfully'})
        })
        .catch(err => {
            res.status(400).send('failed');
        });

});


//get all trains details
train.route('/').get(function(req, res){
    ticketsT.find(function(err, todos){
        if(err){
            console.log(err);
        }else{
            
            res.json(todos);
        }
    });
});

//get one train details
train.route('/:id').get(function(req, res){
    let id = req.param.id;
    ticketsT.findById(id, function(err, todos){
       // res.status(200).json({'user': 'Details regarding one train'});
       if(err){
           console.log(err);
       }else{
           res.json(todos);
       }
        
    });
});

//delete one train detail
train.route('/delete/:id').delete(function(req, res){
    let id = req.param.id;
    ticketsT.remove(id, function(err, result){
        res.send("Deleteed");
    });
});

//update details
train.route('/update/:id').post(function(req, res){
    ticketsT.findById(req.param.id, function(err, todo){
        if(!todo)
            res.status(404).send('data is not found ');
        else
            todo.ticketName = req.body.ticketName;
            todo.from = req.body.from;
            todo.to = req.body.to;
            todo.price = req.body.price;
            todo.arrivalTime = req.body.arrivalTime;
            todo.depaTime = req.body.depaTime;
            todo.noOfSeat = req.body.noOfSeat;
            todo.remain = req.body.remain;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            
            .catch(err =>{
                res.status(400).send("Update is not possible ")
            });
    });
});
module.exports = train;