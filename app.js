/**
 * Created by Massil on 01/10/2017.
 */
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var app = express();

var User = require("./model/user");

app.use(cors());

app.use('/public' , express.static(__dirname + '/public'));

app.use('/' , require('./controller'));

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