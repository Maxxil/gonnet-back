/**
 * Created by Massil on 01/10/2017.
 */
var nodemail = require("nodemailer");

var MailConfig = require('./../config/mailconf');

var log = require('./../config/log4js');

module.exports =
    {
        sendMail : function(text, object) {
            var smtpConfig = MailConfig;
            var transporter =  nodemail.createTransport(smtpConfig);
            console.log("Transporter initialized");

            var messsage = {
                from : "massil.kadi@gmail.com",
                //to : "anthony.gonnet.42@gmail.com",
                to: 'massil.kadi@gmail.com',
                subject : object,
                text : text,
                html : ''
            };
            console.log("Message initialized");

            transporter.sendMail(messsage , function(err , info){
                if(err){
                    console.error("An error occured");
                    console.log(err) ;
                    this.log.error(err);
                }
                else
                    console.log("Email sent: " + info.response);
            });
        }
    };