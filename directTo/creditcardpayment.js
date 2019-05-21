
var nodemailer = require('nodemailer');
var express = require('express');
var creditcardpayment = express.Router();

const dbCard = require('../modelsC/dbCreditCard');
var CreditCardT = dbCard.model('CardPay');

creditcardpayment.route('/add').post(function (req, res) {

    var creditcarday = new CreditCardT({
        bookingDate:req.body.bookingDate,
        email: req.body.email,
        cvc: req.body.cvc,
        total: req.body.total,
        subtotal: req.body.subtotal
    });
    creditcarday.save()
        .then(() =>{
            res.status(200).json({'payment': 'Added successfully'})
        })
        .catch(err => {
            res.status(400).send('failed' + err);
        });

    var output =
        `<b>Book Your Train</b>
                <p>Dear Sir/Madam, We recieved your payment of ${creditcarday.subtotal} LKR.
                Thank you for using our service</p>`;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: 'trainticketbookpd@gmail.com',
            pass: 'praveena123'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: '"Book Your Train" <trainticketbookpd@gmail.com>',
        to: creditcarday.email,
        subject: 'Payment Confirmation',
        text: 'Hello',
        html: output
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log('Message sent: ' + info.messageId);
        console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));

    });

});

module.exports = creditcardpayment;