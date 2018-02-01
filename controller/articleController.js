/**
 * Created by Massil on 12/10/2017.
 */
var router = require("express").Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var morgan = require('morgan');
var fs = require('fs');

var Article = require('./../model/article');
var articleMapper = require("./../helper/mapper/articleMapper");
var articleService = require("./../service/articleService");
var env = require('./../config/environnementconf');
var security = require('./../config/security');
var jwt = require('./../helper/tokenHelper');
var Error = require('./../model/error');

var log = require('./../config/log4js').getLogger('gonnetLogger');

router.use(bodyParser.json());
router.use(morgan(env.environnement));

log.level = 'debug';

var filename = '';

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './data/images/articles')
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

router.get('/', function (req, res) {
    var promise = articleService.getAllArticles();
    promise.then(function(articles){
        console.log(articles);
        res.json({
            success : true,
            articles : articles
        });
        res.end();
    });
});

router.get('/:token' , function (req , res) {
    log.info('Article get');
    try{
        var token = req.params.token;
        if(token)
        {
            var tokenVerification = jwt.verifyToken(token);
            console.log(tokenVerification);
            if(tokenVerification)
            {
                var promise = articleService.getAllArticles();
                promise.then(function(articles){
                    console.log(articles);
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

router.post('/:token' ,upload.single('file'), function (req , res) {
    log.info('Article add');
    console.log('Article add');
    try {
        if(req.file != undefined)
        {
            var tokenVerification = jwt.verifyToken(req.params.token);
            if(tokenVerification)
            {
                console.log("Création de l'article");
                var article = articleMapper.createArticle(req, filename);
                console.log("Enregistrement de l'article");
                var promise = articleService.createArticle(article);
                promise.then(function (success) {
                    console.log("Article ajouté avec succes");
                    log.info("L'aticle " + success._id + " a été ajouté");
                    res.json({
                        success: true
                    });
                    res.end();
                }).catch(function (reason) {
                    console.log("Probleme lors de l'ajout");
                    console.log(reason);
                    log.error(reason);
                    res.json({
                        success: false,
                        error: Error.unknown_error
                    });
                    res.end();
                });
            }
            else
            {
                console.log("Non autorisé");
                res.json({
                    success: false,
                    error: Error.not_allowed
                });
                res.end();
            }
        }
        else
        {
            console.log("Aucun image récupéré");

            res.json({
                success: false,
                error: Error.file_not_uploaded
            });
            res.end();
        }
    }
    catch(error)
    {
        console.log("Erreur");
        log.error(error);
        res.json({
            success: false,
            error: Error.unknown_error
        });
        res.end();
    }
});

router.delete('/:id/:token' , function (req , res) {
    log.debug('Delete article: ' + req.params.id);
    var tokenVerification = jwt.verifyToken(req.params.token);
    var id = req.params.id;
    if(tokenVerification)
    {
        articleService.deleteArticle(id)
            .then(function (result) {
                console.log('OK');
                /*fs.unlink('./../data/images/article/'+result.image)
                    .then(function (result) {
                        res.json({
                            success: true
                        });
                        res.end();
                    })
                    .catch(function (error) {
                        res.json({
                            success: false,
                            error: Error.file_cannot_be_delete
                        })
                    });*/

                res.json({
                    success: true
                });
                res.end();

            })
            .catch(function (error) {
                console.log('KO');
                console.log(error);
                log.error(error);
                res.json({
                    success: false,
                    error : Error.unknown_error
                });
                res.end();
            })
    }
    else {
        console.log("Not allowed");
        log.error("Token non autorisé: " + req.params.token);
        res.json({
            success: false,
            error : Error.unknown_error
        });
        res.end();
    }
});

router.put('/:id/:token' , upload.single('file'), function (req, res) {
    log.info('Article PUT');
    try{
        var tokenVerification = jwt.verifyToken(req.params.token);
        var id = req.params.id;
        if(tokenVerification)
        {
            var article = articleMapper.createArticle(req,  filename);
            var promise = articleService.updateArticle(id , article);
            promise.then(function (result) {
                res.json({
                    success: true,
                    article : result
                });
                res.end();
            }).catch(function (reason) {
                res.json({
                    success : false,
                    error : Error.unknown_error
                });
                res.end();
            })
        }
        else
        {
            res.json({
                success : false,
                error : Error.not_allowed
            });
            res.end();
        }
    }
    catch(error)
    {
        log.error(error);
    }
})

module.exports = router;