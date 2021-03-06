var router = require('express').Router();

var bodyParser = require('body-parser');
var multer = require('multer');

var log = require('./../config/log4js').getLogger('gonnetLogger');
var jwt = require('./../helper/tokenHelper');
var projectMapper = require('./../helper/mapper/projectMapper');
var projectService = require('./../service/projectService');
var Error = require('./../model/error');

router.use(bodyParser.json());

var filename = '';
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './data/images/projects')
    },
    filename: function (req, file, cb) {
        console.log(file);
        var datetimestamp = Date.now();
        filename = file.fieldname + '-' + datetimestamp + '.' + 'jpg'; //file.originalname.split('.')[file.originalname.split('.').length -1];
        cb(null, filename)
    }
});

var upload = multer({ //multer settings
    storage: storage
});

router.get('/', function (req, res) {
    projectService.getAllProjects()
        .then(function (success) {
            console.log(success);
            res.json({
                success: true,
                projects : success,
                error : 0
            });
            res.end();
        })
        .catch(function (error) {
            log.error(error);
            res.json({
                success: false,
                error : Error.unknown_error
            });
            res.end();
        })
});

router.get('/:token', function (req, res) {
    log.info("GET project");
    var token = req.params.token;
    var tokenVerification = jwt.verifyToken(token);
    if(tokenVerification)
    {
        projectService.getAllProjects()
            .then(function (success) {
                res.json({
                    success: true,
                    projects : success,
                    error : 0
                });
                res.end();
            })
            .catch(function (error) {
                log.error(error);
                res.json({
                    success: false,
                    error : Error.unknown_error
                });
                res.end();
            })
    }
    else
    {
        res.json({
            success: false,
            error : Error.not_allowed
        });
        res.end();
    }
    
});

router.get('/:id/:token', function (req, res) {
    var token = req.params.token;
    var id = req.params.id;
    var tokenVerification = jwt.verifyToken(token);
    if(tokenVerification)
    {
        var promise = projectService.getProject(id);
        promise.then(function (success) {
                res.json({
                    success: true,
                    project: success
                });
                res.end();
            }
        ).catch(function (error) {
                log.error(error);
                res.json({
                    success: false,
                    error: Error.unknown_error
                });
                res.end();
        });
    }
    else
    {
        res.json({
            success: false,
            error: Error.not_allowed
        });
        res.end();
    }
});

router.post('/:token', upload.single('file'),function (req , res) {

    log.info('Project POST');
    var token = req.params.token;
    var tokenVerification = jwt.verifyToken(token);
    if(tokenVerification)
    {
        if(req.file != undefined)
        {
            var project = projectMapper.createProject(
                req.body,
                filename
            );
            console.log('Projet a ajouter: ');
            console.log(project);
            var promise = projectService.addProject(project);
            promise.then(function (success) {
                console.log('Success');
                res.json({
                    success: true
                });
                res.end();
            }).catch(function (error) {
                log.error('Error');
                console.log(error);
                res.json({
                    success : false,
                    error : Error.unknown_error
                });
                res.end();
            });
        }
        else
        {
            console.log('No file uploaded');
            res.json({
                success: false,
                error: Error.file_not_uploaded
            });
            res.end();
        }
    }
    else
    {
        res.json({
            success : false,
            error : Error.not_allowed
        })
    }
});

router.put('/:id/:token', upload.single('file'), function (req, res) {
    var token = req.params.token;
    var id = req.params.id;
    var tokenVerification = jwt.verifyToken(token);
    if(tokenVerification)
    {
        var project = projectMapper.createProject(req.body, filename);
        var promise = projectService.updateProject(id, project);
        promise.then(function (success)
            {
                console.log(success);
                res.json({
                    success: true,
                    project : success
                });
                res.end();
            }
        ).catch(function (error) {
            log.error(error);
            res.json({
                success: false,
                error: Error.unknown_error
            });
            res.end();
        });
    }
    else
    {
        res.json({
            success: false,
            error: Error.not_allowed
        });
        res.end();
    }
});


router.delete('/:id/:token' , function (req, res) {
    var verifToken = jwt.verifyToken(req.params.token);
    var id = req.params.id;
    if(verifToken)
    {
        projectService.deleteProject(id).then(
            function (result) {
                res.json({
                    success: true
                });
                res.end();
            }
        ).catch(function (error) {
            res.json({success: false,
            error: Error.unknown_error});
            res.end();
        });
    }
    else
    {
        res.json({
            success: false,
            error: Error.not_allowed
        });
        res.end()
    }
});


module.exports = router;