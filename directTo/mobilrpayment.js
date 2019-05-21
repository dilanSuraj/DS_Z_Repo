var express = require('express');
var Mobilepayment = express.Router();
const dbMobile = require('../modelsC/dbMobilePay');
var MobilePayT = dbMobile.model('MobilePay');

Mobilepayment.route('/add').post(function (req, res) {

    var mobilepay = new MobilePayT({
        bookingDate:req.body.bookingDate,
        email: req.body.email,
        phone: req.body.phone,
        total: req.body.total,
        subtotal: req.body.subtotal
    });
    mobilepay.save()
        .then(() =>{
            res.status(200).json({'payment': 'Added successfully'})
        })
        .catch(err => {
            res.status(400).send('failed' + err);
        });

    const accountSid = 'ACce5891febbb1f836388290b7d93606dd';
            const authToken = '4e74c05e24d3d12848bbe757d121b351';
            const client = require('twilio')(accountSid, authToken);
            var output =
                `Book Your Train
                Dear Sir/Madam, We recieved your payment of ${mobilepay.total} LKR.
                Thank you for using our service`;
            

    client.messages
                .create({
                    body: output,
                    from: '+18087252378',
                    to: mobilepay.phone
                })
                .then(message => console.log(message.sid)).catch(err => {
            return console.log(err);
        })
});

module.exports = Mobilepayment;