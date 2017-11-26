var router = require('express').Router();
var bodyParser = require('body-parser');
var argon2 = require('argon2');
var crypto = require('crypto');
var userService = require('./../service/userService');
var userMapper = require('./../helper/mapper/userMapper');
var userEnum = require('./../helper/enum/userEnum');
var hashEnum = require('./../helper/enum/argonEnum');

router.use(bodyParser.json());

router.post('/' , function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var salt = crypto.randomBytes(16).toString('hex');
    argon2.hash(password, salt)
        .then(function (hash) {
            var user = userMapper.createUser(email , hash , salt);
            var promise = user.save();
            promise.then(function (user) {
                res.send(userEnum.addEnum.get('ADD_USER_COMPLETED'));
                res.end();
            }).catch(function (error) {
                res.send(userEnum.addEnum.get('ADD_USER_ERROR'));
                res.end();
            });
        }).catch(function (error) {
            result = error;
            res.end(hashEnum.hash.get('HASH_ERROR'));
        });
});

module.exports = router;