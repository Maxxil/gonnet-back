var log4js = require('log4js');
var session = require('express-session');


module.exports = {
    initialize : function (app) {
        app.use(session({
            secret : 'jmjmlkml',
            resave : false,
            saveUnintialized : true,
            httpOnly : true,
            maxAge: 1800000
            //Le secure est à mettre en place lorsque le https sera
            //mis en place aussi
            //,secure : true
        }));
    }
};