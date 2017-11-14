var router = require('express').Router();
var path = require('path');
var bodyParser = require('body-parser');

router.use(bodyParser.json());

router.get('/:id' , function (req, res) {
    console.log(path.resolve(__dirname + '\\..\\data\\images\\' + req.params.id));
    res.sendFile(path.resolve(__dirname + '\\..\\data\\images\\' + req.params.id));
    res.end();
});


module.exports =  router;