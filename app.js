/**
 * Created by Massil on 01/10/2017.
 */
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var session = require('express-session');

var app = express();

var User = require("./model/user");

app.use(cors());

app.use('/data' , express.static(__dirname + '/data'));

app.use('/' , require('./controller'));
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


app.listen(4444, function(){
    console.log("API is running");
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
    })
});