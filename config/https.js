var https = require('https');
var fs = require('fs');

var privateKey = fs.readFileSync('./data/certificates/new/private.key');
var certificate = fs.readFileSync('./data/certificates/new/certificate.crt');
const options = {
    key: privateKey,
    cert : certificate
};

module.exports = {
    options : options
};