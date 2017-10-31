/**
 * Created by Massil on 01/10/2017.
 */
var mongoose = require("mongoose");
var db = require("./../config/db");

var mail = new mongoose.Schema({
    nom : 'String',
    email : 'String',
    message : 'String'
});

module.exports = db.model('Mail' , mail);