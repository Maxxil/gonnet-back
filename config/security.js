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
    }
};