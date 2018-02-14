var https = require('https');
var fs = require('fs');

var privateKey = fs.readFileSync('./data/certificates/key.pem');
var certificate = fs.readFileSync('./data/certificates/cert.pem');
const options = {
    key: privateKey,
    cert : certificate
};

module.exports = {
    options : options
};