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

var upload = multer({dest : "data/images"});

router.get('/' , function (req , res) {
    var articles = articleService.getAllArticles();
    res.send(articles);
    res.end();
});

router.post('/' ,upload.single('image'), function (req , res) {
    var article = articleMapper.createArticle(req);

    var result = articleService.createArticle(article);

    res.send(result);
    res.end();
});

module.exports = router;