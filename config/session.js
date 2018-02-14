var session = require('express-session');
var Error = require('./../model/error');
var log = require('./log4js').getLogger('gonnetLogger');
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
    },
    setSessionVariables : function (req, res) {
        var session = req.session;
        session.token = req.body.token;
    },
    sessionManagement : function (req) {
        var session = req.session;
        if(session.token)
        {
            res.json({
                success: false,
                error : Error.not_allowed
            });
            res.end();
        }
    },
    sessionDestroy : function (req, res) {
        var session = req.session;
        session.destroy(function (err) {
            log.info("Probleme lors de la destruction de la session");
            log.error(err);
        })
    }
};