/**
 * Created by Massil on 01/10/2017.
 */
var router = require("express").Router();

//router.use('/mail' , require('./mailController'));
router.use('/login' , require('./loginController'));
router.use('/article' , require('./articleController'));
router.use('/image' , require('./imageController'));
router.use('/signin' , require('./signinController'));
router.use('/mail' , require('./mailController'));
router.use('/project', require('./projectController'));
router.use('/projectByType' , require('./projectByTypeController'));
router.use('/favincon.ico' , function (req, res) {
    res.end('No icon');
});
router.all('*', function (req, res) {
    res.end('Home page');
});

module.exports = router;