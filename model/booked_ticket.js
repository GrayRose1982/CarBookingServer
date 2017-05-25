/**
 * Created by ninhh on 5/25/2017.
 */
var db = require('../database/dbConfig');

//add
exports.add = function(account_id, gara_id, booked_time, is_expired, checkin_time, checkout_time, callback) {
    db.getConnection(function(err, client) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        var sql = "INSERT INTO booked_ticket(account_id, gara_id, booked_time, is_expired, checkin_time, checkout_time) VALUES ("  + account_id
            + ", " + gara_id + ", '" + booked_time + "', " + is_expired + ", '" + checkin_time + "', '" + checkout_time + "')";
        client.query(sql, function(err) {
            // db.endConnection();
            if(err) {
                return console.error('error running query', err);
            }
            callback({'response': 'Successfully add', 'res': true});
        });
    });
};

//get open ticket all
exports.getOpenTicketByAccountId = function(account_id, callback) {
    db.getConnection(function (err, client) {
        if(err) {
            return console.error('error fetching client from pool', err);
        }

        var sql = "SELECT booked_ticket.id, booked_ticket.booked_time, booked_ticket.checkin_time, booked_ticket.checkout_time, " +
            "booked_ticket.gara_id, booked_ticket.account_id FROM booked_ticket, account WHERE account.id = booked_ticket.account_id " +
            "AND is_expired = 0 AND (checkin_time = '' OR checkout_time = '') AND account.id = " + account_id + "";
        client.query(sql, function(err, result) {
            // db.endConnection();
            if(err) {
                return console.error('error running query booked_ticket', err);
            }

            sql = "SELECT gara.id, gara.name, gara.address, gara.picture, gara.total_slot, gara.busy_slot, gara.booking_slot, gara.location_x, location_y, location_z " +
                "FROM booked_ticket, account, gara " +
                "WHERE account.id = booked_ticket.account_id AND gara.id = booked_ticket.gara_id " +
                "AND is_expired = 0 AND (checkin_time = '' OR checkout_time = '') " +
                "AND account.id = " + account_id;
            client.query(sql, function (err, result2) {
                if(err) {
                    return console.error('error running query gara', err);
                }

                callback({'response': 'Successfully query', 'res': true, 'data': {"booking_ticked" : result, "gara" : result2}});
            })
        });
    })
};