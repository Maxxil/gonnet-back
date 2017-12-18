/**
 * Created by Massil on 01/10/2017.
 */
var nodemail = require("nodemailer");

var MailConfig = require('./../config/mailconf');

module.exports =
    {
        sendMail : function(text) {
            var smtpConfig = MailConfig;
            var transporter =  nodemail.createTransport(smtpConfig);

            var messsage = {
                from : "massil.kadi@gmail.com",
                to : "anthony.gonnet.42@gmail.com",
                subject : 'Contacte depuis www.anthony-gonnet.com',
                text : text
            };

            transporter.sendMail(messsage , function(err , info){
                if(err)
                    console.log(err) ;
                else
                    console.log("Email sent: " + info.response);
            });
        }
    };