var express = require('express');
var account = require('../model/account');
var gara = require('../model/gara');
var ticket = require('../model/booked_ticket');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//region account
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
//endregion

//region gara
router.post('/gara/add', function (req, res) {
    var name = req.body.name;
    var address = req.body.address;
    var picture = req.body.picture;
    var total_slot = req.body.total_slot;
    var busy_slot = req.body.busy_slot;
    var booking_slot = req.body.booking_slot;
    var location_x = req.body.location_x;
    var location_y = req.body.location_y;
    var location_z = req.body.location_z;

    gara.add(name, address, picture, total_slot, busy_slot, booking_slot, location_x, location_y, location_z, function (found) {
        console.log(found);
        res.json(found);
    });
});
//endregion

//region booked_ticket
//add
router.post('/ticket/add', function (req, res) {
    var account_id = req.body.account_id;
    var gara_id = req.body.gara_id;
    var booked_time = req.body.booked_time;
    var is_expired = req.body.is_expired;
    var checkin_time = req.body.checkin_time;
    var checkout_time = req.body.checkout_time;
    ticket.add(account_id, gara_id, booked_time, is_expired, checkin_time, checkout_time, function (found) {
       console.log(found);
       res.json(found);
    });
});

//get open booked ticket
router.post('/ticket/getopenticket', function (req, res) {
    var account_id = req.body.account_id;
    ticket.getOpenTicketByAccountId(account_id, function (found) {
        // console.log(found);
        res.json(found);
    });
});

//endregion

module.exports = router;