var User = require('./../model/user');

module.exports = {
    addUser : function (user) {
        var promise = user.save();
        promise.then(function (user) {
            return "OK add user";
        }).catch(function (error) {
            return "KO add user. Error: " + error;
        });
    },
    updateUser : function (id, user) {

    },
    getUser : function (user) {
        var promise = User.find({username : user.username , password : user.password}).exec();
        return promise;
    }
};