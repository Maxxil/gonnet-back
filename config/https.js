var https = require('https');
var fs = require('fs');

var privateKey = fs.readFileSync('./data/certificates/privkey.pem');
var certificate = fs.readFileSync('./data/certificates/fullchain.pem');
const options = {
    key: privateKey,
    cert : certificate
};

module.exports = {
    options : options
};