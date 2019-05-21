//var module = module.exports = {};

var express = require('express');
var goInto = express.Router();

//path of files in directInto
const user = require('./directTo/user'); 
const tickets = require('./directTo/tickets');



//direct to relavent file
goInto.use('/user', user);
goInto.use('/tickets', tickets);

module.exports = goInto;