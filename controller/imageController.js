var router = require('express').Router();
var path = require('path');
var bodyParser = require('body-parser');
var log = require('./../config/log4js').getLogger('gonnetLogger');

log.level = 'debug';

router.use(bodyParser.json());

router.get('/:id' , function (req, res) {
    log.info('Image GET');
    try{
        res.sendFile(path.resolve(__dirname + '\\..\\data\\images\\' + req.params.id));
        res.end();
    }
    catch(error)
    {
        log.error(error);
    }

});


module.exports =  router;