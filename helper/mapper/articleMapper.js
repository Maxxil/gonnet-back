/**
 * Created by Massil on 18/10/2017.
 */
module.exports = {
    createArticle : function (req) {
        var article = new Article({
            title : title,
            text : text,
            date : new Date(),
            image : image
        });
        return article;
    }
}