/**
 * Created by Massil on 18/10/2017.
 */
Article = require("./../model/article");

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

    getAllArticles : function () {
        return Article.find({}).exec();
    }
};