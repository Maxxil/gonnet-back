/**
 * Created by Massil on 01/10/2017.
 */
var mongoose = require("mongoose");
var db = require("./../config/db");

var project = new mongoose.Schema({
    title : 'String',
    image : 'String',
    description : 'String'
});

module.exports = db.model('Project' , project);