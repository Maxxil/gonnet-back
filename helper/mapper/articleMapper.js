/**
 * Created by Massil on 18/10/2017.
 */
module.exports = {
    createArticle : function (body, filename) {
        var article = new Article({
            title : body.title,
            text : body.text,
            link: body.link,
            date : new Date(),
            image : filename
        });
        return article;
    }
};