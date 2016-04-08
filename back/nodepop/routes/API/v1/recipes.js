"use strict";

var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = mongoose.model('User');
//var Item = mongoose.model('Item');
var auth = require('../../../lib/auth');
//var hash = require('hash.js');

router.get('/', function(req, res) {
    res.send('respond with a resource');
    console.info("get ok");
    User.list(req.body, function(err, rows) {
        if (err) {
            res.json({ result: false, err: err });
            console.info('error en users.js');
            return;
        }
        res.json({ result: true, users: rows });
        return;
    });
});
module.exports = router;
