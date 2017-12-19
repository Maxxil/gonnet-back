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
var session = require('express-session');

var log = require('./../config/log4js').getLogger('gonnetLogger');

router.use(bodyParser.json());

log.level = 'debug';

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
    log.info('Article get');
    try{
        var promise = articleService.getAllArticles();
        promise.then(function(articles){
            res.send(articles);
            res.end();
        });
    }
    catch(error)
    {
        log.error(error);
    }
});

router.get('/:idArticle' , function (req , res) {
    log.info('Article get with params');
    try{
        var promise = articleService.getArticle(req.params.idArticle);
        promise.then(function (article) {
            console.log(article);
            res.send(article);
            res.end();
        }).catch(function (error) {
            console.log(error);
            log.error(error);
        });
    }
    catch(error)
    {
        log.error(error);
    }
});

router.put('/' ,upload.single('file'), function (req , res) {
    log.info('Article POST');
    try {
        if(req.file != undefined)
        {
            console.log(req.file.filename);
            console.log("2");
            var article = articleMapper.createArticle(req, filename);
            var result = articleService.createArticle(article);
            res.send(result);
            res.end();
        }
    }
    catch(error)
    {
        log.error(error);
    }
});

router.delete('/' , function (req , res) {
    articleService.deleteArticle(req, res);
});

router.post('/:idArticle' , upload.single('file') , function (req , res) {
    log.info('Article PUT');
    try{
        var article = articleService.updateArticle(req , res);
    }
    catch(error)
    {
        log.error(error);
    }
});

module.exports = router;