var router = require('express').Router();

var log = require('./../config/log4js').getLogger('gonnetLogger');
var projectService = require('./../service/projectService');
var Error = require('./../model/error');

router.get('/constribution' , function (req, res) {
    log.info("Récupération des projets contributions");
    var promise = projectService.getContributionProjects();
    promise.then(function (result) {
        res.json({
            success: true,
            projects: result
        });
        res.end();
    }).catch(function (error) {
        console.log(error);
        log.info("Erreur lors de la récupérations des contributions");
        log.error(error);
        res.json({
            success: false,
            error: Error.unknown_error
        });
        res.end();
    })
});

router.get('/personal' , function (req, res) {
    log.info("Récupération des projets personnels");
    console.log("Personnel");
    var promise = projectService.getPersonnalProjects();
    promise.then(function (result) {
        console.log("Perso");
        console.log(result);
        res.json({
            success: true,
            projects: result
        });
        res.end();
    }).catch(function (error) {
        console.log(error);
        log.info("Erreur lors de la récupérations des contributions");
        log.error(error);
        res.json({
            success: false,
            error: Error.unknown_error
        });
        res.end();
    })
});


module.exports = router;