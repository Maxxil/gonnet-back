/**
 * Created by Massil on 12/10/2017.
 */
var mongoose = require("mongoose");
var db = require("./../config/db");

var article = new mongoose.Schema({
        title : 'String',
        text : 'String',
        date : 'Date',
        image : 'String'
    });

module.exports = db.model('Article' , article);