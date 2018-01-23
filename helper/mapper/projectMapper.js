var Project = require('./../../model/project');

module.exports = {
    createProject: function (title, image, description) {
        return new Project({
            title: title,
            image: image,
            description: description
        });
    }
};