//var module = module.exports = {};

var express = require('express');
var goInto = express.Router();

//path of files in directInto
const user = require('./directTo/user'); 
const tickets = require('./directTo/tickets');
const creditcardpay = require("./directTo/creditcardpayment");
const mobilecardpay = require('./directTo/mobilrpayment');



//direct to relavent file
goInto.use('/user', user);
goInto.use('/tickets', tickets);
goInto.use('/cardpay',creditcardpay);
goInto.use('/mobilepay',mobilecardpay);
module.exports = goInto;