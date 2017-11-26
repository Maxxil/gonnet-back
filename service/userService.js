module.exports = {
    addUser : function (user) {
        var promise = user.save();
        promise.then(function (user) {
            return "OK add user";
        }).catch(function (error) {
            return "KO add user. Error: " + error;
        });
    }
};