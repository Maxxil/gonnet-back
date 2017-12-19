/**
 * Created by Massil on 01/10/2017.
 */
 var router = require('express').Router();
 var Mail = require('./../model/mail');
 var bodyParser = require('body-parser');
 var Response = require('./../model/response');
 var MailService = require('./../service/mailService');

 var log = require('./../config/log4js').getLogger('gonnetLogger');

 router.use(bodyParser.json());

 router.get('/' , function (req , res) {
     log.info('Mail GET');
     var m = MailService.sendMail("Test");
     res.send(m);
     res.end();
 });

 router.post("/" , function(req , res){
     log.info('Mail POST');
     var nom = req.body.nom;
     var email = req.body.email;
     var message = req.body.message;

     var content = "Mr/Mme " + nom + " vous a envoyé un message.\n" +
         "Voici son message: \n" + message + "\n" +
         "Voici son mail pour recontacter : " + email;

     MailService.sendMail(content);
     var mail = Mail({
         nom : nom,
         email : email,
         message : message
     }).save().catch(function (error) {
         log.error(error);
     });
     res.end("OK envoie");
 });

 module.exports = router;