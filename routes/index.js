var express = require('express');
var account = require('../model/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/account/register', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    account.register(email, password, function (found) {
        console.log(found);
        res.json(found);
    });
});

router.post('/account/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    account.login(email, password, function (found) {
        console.log(found);
        res.json(found);
    });
});

router.post('/account/getAllAccount', function (req, res) {
        account.getAllAccount(function (found) {
        console.log(found);
        res.json(found);
    });
});

module.exports = router;