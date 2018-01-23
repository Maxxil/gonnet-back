var chai = require("chai");
var expect = chai.expect;
var tokenHelper = require('./../../helper/tokenHelper');
var User = require('./../../model/user');

describe('TokenHelper' , function () {
    it('generateToken() should return a token' , function () {
        var token = tokenHelper.generateToken();
        var user = new User({
            username : 'test token username',
            password : 'test token password',
            salt : 'test token salt'
        });

    })
});