/**
 * Created by Massil on 12/10/2017.
 */
var router = require('express').Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var User = require('./../model/user');
var jwt = require('./../helper/tokenHelper');
var env = require('./../config/environnementconf');

var log = require('./../config/log4js').getLogger('gonnetLogger');
router.use(bodyParser.json());

router.post('/' , function(req , res)
{
    log.info('Login GET');
    var username = req.body.username;
    var password = req.body.password;
    var promise = User.find({username : username , password : password}).exec();
    promise.then(function (user) {
        console.log(user.length > 0);
        if(user.length > 0){
            var token = jwt.generateToken(user);
            console.log('Success');
            res.json({
                success : true,
                token : token,
                isFirstConnection : user.isFirstConnection
            });
        }
        else
        {
            console.log('Error');
            res.json({
                success : false
            })
        }
        res.end();
    }).catch(function (error) {
        console.log("Error: " + error);
        res.send(error);
        log.error(error);
        res.end("END");
    });
});

router.put('/' , function (req , res) {
    var username = req.body.username;
    var password = req.body.password;
});

module.exports = router;