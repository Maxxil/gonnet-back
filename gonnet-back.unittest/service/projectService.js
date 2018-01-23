var chai = require('chai');
var expect = chai.expect;

var service = require('./../../service/projectService');
var Project = require('./../../model/project');

describe('ProjectService', function () {
    it('Add Project Unit Test', function () {
        var project = new Project({
            title: 'title',
            image: 'image',
            text: 'text'
        });
        var result = service.addProject(project);
        expect(result).to.be(true);
    })
})