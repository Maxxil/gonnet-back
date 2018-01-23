/**
 * Created by Massil on 12/10/2017.
 */
var router = require('express').Router();
var bodyParser = require('body-parser');
var morgan = require('morgan');

var User = require('./../model/user');
var security = require('./../config/security');
var jwt = require('./../helper/tokenHelper');
var env = require('./../config/environnementconf');

var log = require('./../config/log4js').getLogger('gonnetLogger');
router.use(bodyParser.json());


router.use(morgan(env.environnement));

router.post('/' , function(req , res)
{
    log.info('Login GET');
    var username = req.body.username;
    var password = req.body.password;
    console.log(username);
    var promise = User.find({username : username , password : password}).exec();
    promise.then(function (user) {
        console.log(user.length > 0);
        if(user.length > 0){
            var token = jwt.generateToken(user);
            console.log('Success');
            res.json({
                success : true,
                token : token
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

module.exports = router;