/**
 * Created by Massil on 12/10/2017.
 */
var router = require('express').Router();
var bodyParser = require('body-parser');
var User = require('./../model/user');

var log = require('./../config/log4js').getLogger('gonnetLogger');
router.use(bodyParser.json());


router.post('/' , function(req , res)
{
    log.info('Login GET');
    var username = req.username;
    var password = req.password;

    var promise = User.find({username : username , password : password}).exec();
    promise.then(function (user) {
        if(user){
            res.send('OK');
        }
        else
        {
            res.send("Error");
        }
        res.end("END");

    }).catch(function (error) {
        console.log("Error: " + error);
        res.send(error);
        log.error(error);
        res.end("END");
    });
});

module.exports = router;