var User = require('./../../model/user')

module.exports = {
    createUser : function (body) {
        var user = new User({
            email : body.email,
            password : body.password,
            salt : body.salt
        });
        return user;
    }
};