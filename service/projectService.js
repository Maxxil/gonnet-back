
var Project = require('./../model/project');
var typeProjectEnum = require('./../helper/enum/typeProjectEnum');

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
    getContributionProjects: function () {
      return Project
          .find({typeProjet: typeProjectEnum.CONTRIBUTION })
          .exec();
    },
    getPersonnalProjects : function () {
        return Project
            .find({typeProjet: typeProjectEnum.PROJET_PERSO })
            .exec();
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
            if(value.link != project.link && project.link != '' && project.link != undefined)
            {
                value.link = project.link;
            }
            value.typeProjet = project.typeProjet;
            return value.save()
        });
    },
    deleteProject: function(id) {
        return Project.remove({_id: id}).exec();
    }
};