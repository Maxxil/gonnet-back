var Project = require('./../../model/project');
var typeProjectEnum = require('./../../helper/enum/typeProjectEnum');

module.exports = {
    createProject: function (body, filename) {
        return new Project({
            title: body.title,
            image: filename,
            description: body.text,
            link: body.link,
            typeProjet: parseInt(body.typeProject)
        });
    }
};