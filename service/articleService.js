/**
 * Created by Massil on 18/10/2017.
 */
Article = require("./../model/article");
Mapper = require("./../helper/mapper/articleMapper");
//var fs = require('fs');

module.exports = {
    //Création d'un article en base de donnée/
    // L'article passé doit être mappé et de type article
    createArticle : function (article ) {
        return article.save();
    },
    ///Mise à jour d'un articlé mappé parssé en paramètre
    ///
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
    deleteArticle : function (id) {
        return Article.find({
            _id : id
        }).exec().then(function (article) {
            //console.log(article);
            /*var file = './../data/images/articles/'+article.image;
            fs.unlink(file);
            return article.remove().exec();*/
        }).catch(function (error) {
            return error;
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