/**
 * Created by Massil on 12/10/2017.
 */
var router = require("express").Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var mime = require('mime');
var Article = require('./../model/article');
var articleMapper = require("./../helper/mapper/articleMapper");
var articleService = require("./../service/articleService");

router.use(bodyParser.json());

var filename = '';

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './data/images')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        filename = file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1];
        cb(null, filename)
    }
});

var upload = multer({ //multer settings
    storage: storage
});

router.get('/' , function (req , res) {
    var promise = articleService.getAllArticles();
    promise.then(function(articles){
        res.send(articles);
        res.end();
    });
});

router.post('/' ,upload.single('file'), function (req , res) {

    if(req.file != undefined)
    {
        console.log(req.file.filename);
        console.log("2");
        var article = articleMapper.createArticle(req, filename);
        var result = articleService.createArticle(article);
        res.send(result);
        res.end();
    }

});

module.exports = router;