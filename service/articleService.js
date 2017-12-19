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
    updateArticle : function (req) {
        if(req.body.imageChanged == true)
        {
            var article = new Article({
                title : req.body.title,
                text : req.body.text,
                date : new Date(),
                image : req.file.filename
            });
        }
        else{
            var article = new Article({
                title : req.body.title,
                text : req.body.text,
                date : new Date()
            });
        }
        var getPromise = Article.find({
            _id : req.body.id
        });
        getPromise.exec(function (result) {

        }, function (error) {
            
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