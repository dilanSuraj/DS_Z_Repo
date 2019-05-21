const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

let goInto = require('./goInto');

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

//all requests will be directed to goInto.js 
app.use('/', goInto);

//server runs on port no 4000
app.listen(PORT, function(){
    console.log("Server is running on Port " + PORT);
 }) 