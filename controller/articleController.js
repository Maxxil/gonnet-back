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
    log.debug("Tentative de récupération de tous les articles sans token");
    var promise = articleService.getAllArticles();
    promise.then(function(articles){
        log.debug('Récupération des articles réussies');
        res.json({
            success : true,
            articles : articles
        });
        res.end();
    }).catch(function (error) {
        log.debug("Impossible de récupérer tous les articles - Sans token");
        log.error(error);
    });
});

router.get('/:token' , function (req , res) {
    log.info("Récupération d'un article via un token");
    try{
        var token = req.params.token;
        if(token)
        {
            var tokenVerification = jwt.verifyToken(token);
            if(tokenVerification)
            {
                log.info("Autorisation de récupération de tous les articles - Avec token");
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
                log.info('Le token: ' + token + " n'est pas autorisé. a récupérer tous les articles - Avec token");
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
    log.info("Récupération de l'article "+ req.body.id+ " - Avec token");
    try{
        var token = req.params.token;
        if(token)
        {
            var tokenVerification = jwt.verifyToken(token);
            if(tokenVerification)
            {
                log.info("Token valide pour récupération de l'article");
                var promise = articleService.getArticle(req.params.idArticle);
                promise.then(function (article) {
                    log.info("Récupération de l'article réussie ");
                    console.log(article);
                    res.json({
                        success : true,
                        articles : article
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
    log.info("Ajout d'article - Avec token");
    try {
        log.info("Tentative d'ajout d'article.");
        if(req.file != undefined)
        {
            var tokenVerification = jwt.verifyToken(req.params.token);
            if(tokenVerification)
            {
                log.info("Token connu - Ajout autorisé");
                log.info("Création de l'article");
                var article = articleMapper.createArticle(req.body, filename);
                log.info("Enregistrement de l'article");
                var promise = articleService.createArticle(article);
                promise.then(function (success) {
                    log.info("L'aticle " + success._id + " a été ajouté");
                    res.json({
                        success: true
                    });
                    res.end();
                }).catch(function (reason) {
                    log.info("Probleme lors de l'ajout");
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
                log.info("Ajout non autorisé - Token non connu");
                res.json({
                    success: false,
                    error: Error.not_allowed
                });
                res.end();
            }
        }
        else
        {
            log.info("Aucun image récupéré");

            res.json({
                success: false,
                error: Error.file_not_uploaded
            });
            res.end();
        }
    }
    catch(error)
    {
        log.error("Erreur lors de l'ajout d'un article");
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
        log.info("Token connu - Ajout autorisé");
        log.info("Tentative de suppression de l'article: " + id);
        articleService.deleteArticle(id)
            .then(function (result) {
                log.info('Suppression effectuée');
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
                log.info("Une erreur s'est produite lors de la suppression de l'article: " + id);
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
    log.info("Mise a jour d'un article - Avec token");
    try{
        var tokenVerification = jwt.verifyToken(req.params.token);
        var id = req.params.id;
        if(tokenVerification)
        {
            log.info("Autorisation de mise a jour d'un article - Avec token");
            var article = articleMapper.createArticle(req.body,  filename);
            var promise = articleService.updateArticle(id , article);
            promise.then(function (result) {
                log.info("Article: " + id + " mis à jour correctement");
                res.json({
                    success: true,
                    articles : result
                });
                res.end();
            }).catch(function (reason) {
                log.info("Un probleme s'est produit lors de la mise à jour de l'article: " + id);
                log.error(reason);
                res.json({
                    success : false,
                    error : Error.unknown_error
                });
                res.end();
            })
        }
        else
        {
            log.info("Token non autorisé");
            res.json({
                success : false,
                error : Error.not_allowed
            });
            res.end();
        }
    }
    catch(error)
    {
        log.info("Une erreur s'est produite.");
        log.error(error);
    }
});

module.exports = router;