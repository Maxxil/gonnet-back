/**
 * Created by Massil on 12/10/2017.
 */
var router = require('express').Router();
var bodyParser = require('body-parser');
var User = require('./../model/user');

router.use(bodyParser.json());


router.post('/' , function(req , res)
{
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

    }).catch(function (error) {
        console.log("Error: " + error);
        res.send(error);
    });

    res.end("END");

});

module.exports = router;