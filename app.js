/**
 * Created by Massil on 01/10/2017.
 */
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();

var User = require("./model/user");
var configLog = require("./config/log4js");
var configSession = require("./config/session");
var envConfig = require("./config/environnementconf");
var httpsConfig = require("./config/https");

var http = require('http');
var https = require('https');
var LEX = require('letsencrypt-express');

var httpsLEX = require("./config/security");

var port = envConfig.getListeningPort();

configLog.initialize();

var log = configLog.getLogger('gonnetLogger');

var domains = [
    'http://anthony-gonnet.com',
    'https://anthony-gonnet.com',
    'http://www.anthony-gonnet.com',
    'https://www.anthony-gonnet.com',
    'http://localhost:4200',
    'http://localhost:63342',
    'http://api.gonnet.ovh/',
    'https://api.gonnet.ovh/'
];

var corsOptions = {
    origin: domains,
    allowedHeaders : 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true
};
app.use(cors(corsOptions));

app.use('/project/image' , express.static(__dirname + '/data/images/projects'));
app.use('/article/image' , express.static(__dirname + '/data/images/articles'));

app.use('/' , require('./controller'));

configSession.initialize(app);


try{
    https.createServer(require('./config/https').options, app).listen(port, function () {
        console.log("Server Launched: " + port);
    });
    /*app.listen(port, function(){
        console.log("API is running on port: " + port);
        log.info('API have been launched');
        mongoose.Promise = global.Promise;
        var promise = User.find(
            {
                username : 'admin'
                , password : 'admin'
            }
        ).exec();
        promise.then(function(data){
            if(!data || data == undefined || data.length == 0)
            {
                console.log("Admin non trouvé");
                var user = User({
                    username : 'admin',
                    password : 'admin'
                });
                var promise = user.save();
                promise.then(function(data){
                    console.log("Utilisateur admin créé");
                    log.info("Utilisateur admin créé");
                }).catch(function (error) {
                    console.log("Erreur lors de la creation de l'utilsiateur");
                    console.log(error);
                    log.error(error);
                })
            }
            else
            {
                console.log("Admin trouvé");
            }
        }).catch(function (error) {
            console.log("ERROR");
            console.log(error);
            log.error(error);
        })
    });*/
}
catch(error)
{
    console.log(error);
    log.fatal(error);
}
