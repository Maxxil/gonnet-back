/**
 * Created by Massil on 18/10/2017.
 */
module.exports = {
    createArticle : function (req, filename) {
        var article = new Article({
            title : req.body.title,
            text : req.body.text,
            date : new Date(),
            image : filename
        });
        return article;
    }
};