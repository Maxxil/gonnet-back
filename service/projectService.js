
var Project = require('./../model/project');

module.exports = {
    addProject : function (project) {
        return project.save();
    },
    getAllProjects : function () {
        return Project.find({}).exec();
    },
    getProject : function (id) {
        return Project.find({_id : id}).exec();
    },
    updateProject : function (id, project) {
        console.log('update');
        return Project.findById(id, function (err, value) {
            if(value.title != project.title && project.title != '' && project.title != undefined)
            {
                value.title = project.title;
            }
            if(value.image != project.image && project.image != '' && project.image != undefined)
            {
                value.image = project.image;
            }
            if(value.description != project.description && project.description != '' && project.description != undefined)
            {
                value.description = project.description;
            }
            console.log(project);
            return value.save()
        });
    },
    deleteProject: function(id) {
        var project = Project.find({_id: id}).exec();
        console.log(project);
        var file = './../data/images/articles/'+project.image;
        fs.unlink(file);
        return project.remove().exec();
    }
};