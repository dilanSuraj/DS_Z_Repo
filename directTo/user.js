var express = require('express');
var user = express.Router();

const dbUser = require('../modelsC/dbUser');
var testT = dbUser.model('identifiers');


//export databse schema

//adding new user details 
user.route('/add').post(function(req, res){
    var dbUser = new testT({
        name: req.body.name,
        email : req.body.email, 
        password: req.body.password, 
        mobileNo: req.body.mobileNo,
        NIC   : req.body.NIC
    }); 
    dbUser.save()
        .then(() =>{
            res.status(200).json({'user': 'Added successfully'})
        })
        .catch(err => {
            res.status(400).send('failed'+err);
        });

});


//get all users details
user.route('/').get(function(req, res){
    testT.find(function(err, todos){
        if(err){
            console.log(err);
        }else{
            
            res.json(todos);
        }
    });
});

//Get user by email and password
user.route('/:email/:password').get(function(req, res){
    let email = req.params.email;
    let password = req.params.password;
   
    testT.find({$and:[{
                email: email,
                password: password
            }]}, function(err, todos){
      
       if(err){
           console.log(err);
       }else{
           res.json(todos);
       }
        
    });
});

//Check for the validity of the email
user.route('/:email').get(function(req, res){
    let email = req.params.email;
    
    testT.find({email: email}, function(err, todos){
      
       if(err){
           console.log(err);
       }else{
           res.json(todos);
       }
        
    });
});

//delete one user
user.route('/delete/:id').delete(function(req, res){
    let id = req.params.id;
    testT.remove(id, function(err, result){
        res.send("Deleteed");
    });
});


//update details
user.route('/update/:id').post(function(req, res){
    testT.find({_id: req.params.id}, function(err, todo){
        if(!todo)
            res.status(404).send('data is not found ');
        else
            todo.name = req.body.name;
            todo.email = req.body.email;
            todo.password = req.body.password;
            todo.mobileNo = req.body.mobileNo;
            todo.NIC = req.body.NIC;

            todo.save().then(todo => {
                res.json('Todo updated');
            })
            
            .catch(err =>{
                res.status(400).send("Update is not possible ")
            });
    });
});






module.exports = user;