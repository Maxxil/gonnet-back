var jwt = require('jsonwebtoken');

var security = require('./../config/security');
var log = require('./../config/log4js').getLogger('gonnetLogger');

module.exports = {
    verifyToken : function (token) {
        jwt.verify(token, security.jwtSecret, function (err, decode) {
            if(err)
            {
                log.error(err);
                return false;
            }
            else
            {
                log.info("Token valid");
                return true;
            }
        })
    },
    generateToken : function (user) {
        return jwt.sign(
            security.generatePayload(user)
            , security.jwtSecret
        );
    }
};