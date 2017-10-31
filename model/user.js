/**
 * Created by Massil on 12/10/2017.
 */
var mongoose = require("mongoose");
var db = require("./../config/db");

var user = new mongoose.Schema({
    username : 'String',
    password : 'String'
});

module.exports = db.model('User' , user);