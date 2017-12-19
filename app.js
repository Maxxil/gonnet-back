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

var env = process.env.ENVIRONMENT;
var port = 8080;

configLog.initialize();

var log = configLog.getLogger('gonnetLogger');

app.use(cors());

app.use('/data' , express.static(__dirname + '/data'));

app.use('/' , require('./controller'));

configSession.initialize(app);

if(env == "PROD")
{
    port = 8080;
}
else
{
    port = 4444;
}

try{
    app.listen(port, function(){
        console.log("API is running");
        log.info('API have been launched');
        mongoose.Promise = global.Promise;
        var promise = User.find(
            {
                username : 'admin'
                , password : 'admin'
            }
        ).exec();
        promise.then(function(data){
            if(!data)
            {
                var user = User({
                    username : 'admin',
                    password : 'admin'
                });
                var promise = user.save();
                promise.then(function(data){
                    assert.equal(data.username , "admin");
                    assert.equal(data.password , "admin");
                })
            }
        }).catch(function (error) {
            console.log("ERROR");
            log.error(error);
        })
    });
}
catch(error)
{
    log.fatal(error);
}
