var https = require('letsencrypt-express');

module.exports = {
    jwtSecret : 'ilovescotchyscotch',
    jwtPayload : {
        iss : 'user',
        exp : Math.floor(Date.now()/1000) + (60*60),
        sub : 'Gonnet Article',
        name : '',
        id : ''
    },
    generatePayload : function (user) {
        this.jwtSecret.name = user.name;
        this.jwtSecret.id = user._id;
        return this.jwtSecret;
    },
    generateSsl : function (domains, app) {
        var res = https.create({
            server : 'staging',
            email : 'massilkadi@hotmail.fr',
            agreeTos: true,
            approveDomains : domains,
            app : app
        });
        return res;
    }
};