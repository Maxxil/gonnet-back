var Project = require('./../../model/project');
var typeProjectEnum = require('./../../helper/enum/typeProjectEnum');

module.exports = {
    createProject: function (title, image, description, typeProject) {
        return new Project({
            title: title,
            image: image,
            description: description,
            typeProjet: parseInt(typeProject)
        });
    }
};