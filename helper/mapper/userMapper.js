var User = require('./../../model/user')

module.exports = {
    createUser : function (email , password , salt) {
        var user = new User({
            email : email,
            password : password,
            salt : salt
        });
        return user;
    }
};