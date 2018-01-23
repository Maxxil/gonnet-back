/**
 * Created by Massil on 18/10/2017.
 */
Article = require("./../model/article");
Mapper = require("./../helper/mapper/articleMapper");

module.exports = {
    createArticle : function (article ) {
        var promise = article.save();
        promise.then(function(article){
            if(article){
                return "OK"
            }
            else
            {
                return "Error"
            }
        }).catch(function (error) {
            return "Error: " + error;
        });
    },
    updateArticle : function (id, article) {
        return Article.findById(id, function (err, result) {
            if(result.title != article.title && article.title != '' && article.title != undefined)
            {
                result.title = article.title;
            }
            if(result.image != article.image && article.image != '' && article.image != undefined)
            {
                result.image = article.image;
            }
            if(result.text != article.text && article.text != '' && article.text != undefined)
            {
                result.text = article.text;
            }
            return result.save();
        })
    },
    deleteArticle : function (req , res) {
        return Article.remove({
            _id : req.body.id
        }).exec(function (success) {
            res.send("OK delete article");
        }, function (error) {
            res.send("ERROR delete article " + error);
        });
    },
    getAllArticles : function () {
        return Article.find({}).exec();
    },
    getArticle : function (idArticle) {
        return Article.find({
            _id : idArticle
        });
    }
};