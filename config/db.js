/**
 * Created by Massil on 12/01/2017.
 */
var mongoose = require("mongoose");
var dbconf = module.require("./dbconf");

var connectionString =
    dbconf.protocol
    + '://'+dbconf.server
    + ':' + dbconf.port
    + '/' + dbconf.dbname;

var dbPromise = mongoose.createConnection(connectionString);

module.exports = dbPromise;