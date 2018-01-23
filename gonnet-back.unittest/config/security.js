var chai = require('chai');
var jwt = require('jwt');
var expect = chai.expect;
var security = require('./../../config/security');
var User = require('./../../model/user');

describe('Security' , function () {
    it("generatePayload() should return element in user variable declared after" , function () {
        var user = new User({
            username : 'test username',
            password : 'test password',
            salt : 'test salt'
        });
        expect(security.generatePayload(user)).to.not.throw();
        var token = security.generatePayload(user);
        var decoded = jwt.verify(token , security.jwtSecret);
        expect(decoded).to.be(1)
    })
});
