/**
 * Created by Massil on 12/10/2017.
 */
var router = require("express").Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var mime = require('mime');
var morgan = require('morgan');
var session = require('express-session');

var Article = require('./../model/article');
var articleMapper = require("./../helper/mapper/articleMapper");
var articleService = require("./../service/articleService");
var env = require('./../config/environnementconf');
var security = require('./../config/security');
var jwt = require('./../helper/tokenHelper');

var log = require('./../config/log4js').getLogger('gonnetLogger');

router.use(bodyParser.json());
router.use(morgan(env.environnement));

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

router.get('/:token' , function (req , res) {
    log.info('Article get');
    try{
        var token = req.params.token;
        if(token)
        {
            var tokenVerification = jwt.verifyToken(token);
            if(tokenVerification)
            {
                var promise = articleService.getAllArticles();
                promise.then(function(articles){
                    res.json({
                        success : true,
                        articles : articles
                    });
                    res.end();
                });
            }
            else{
                res.json({
                    success : false
                });
                res.end();
            }
        }
    }
    catch(error)
    {
        log.error(error);
    }
});

router.get('/:idArticle/:token' , function (req , res) {
    log.info('Article get with params');
    try{
        var token = req.params.token;
        if(token)
        {
            var tokenVerification = jwt.verifyToken(token);
            if(tokenVerification)
            {
                var promise = articleService.getArticle(req.params.idArticle);
                promise.then(function (article) {
                    console.log(article);
                    res.json({
                        success : true,
                        article : article
                    });
                    res.end();
                }).catch(function (error) {
                    console.log(error);
                    log.error(error);
                    res.json({
                        success : false
                    });
                    res.end();
                });
            }
        }

    }
    catch(error)
    {
        log.error(error);
    }
});

router.put('/:token' ,upload.single('file'), function (req , res) {
    log.info('Article POST');
    try {
        if(req.file != undefined)
        {
            var tokenVerification = jwt.verifyToken(req.params.token);
            if(tokenVerification)
            {
                var article = articleMapper.createArticle(req, filename);
                var result = articleService.createArticle(article);
                res.send(result);
                res.end();
            }
        }
    }
    catch(error)
    {
        log.error(error);
    }
});

router.delete('/:token' , function (req , res) {
    var tokenVerification = jwt.verifyToken(req.params.token);
    if(tokenVerification)
    {
        articleService.deleteArticle(req, res);
    }
});

router.post('/:idArticle/:token' , upload.single('file') , function (req , res) {
    log.info('Article PUT');
    try{
        var tokenVerification = jwt.verifyToken(req.params.token);
        if(tokenVerification)
        {
            articleService.updateArticle(req , res);
        }
    }
    catch(error)
    {
        log.error(error);
    }
});

module.exports = router;