"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../lib/auth');

/* GET users listing. */
router.get('/', auth(), function(req, res, next) {
    console.info("req user: ", req.user);
    //console.info("res", res);
    //console.info("next", next);
    
    var sort = req.query.sort;
    User.list(sort, function(err, rows) {
        if (err) {
            res.json({ result: false, err: err });
            console.info('error en users.js');
            return;
        }
        res.json({ result: true, users: rows });
        return;
    });
});

router.post('/', auth(), function(req, res) {

    var user = new User(req.body);
    var queryUsuarios = User.find({ nombre: req.body.nombre });

    queryUsuarios.exec(function(err, rows) {

        if (err) {
            res.json({ result: false, err: " error query" });
            return;
        }

        //console.info("long rows.length: ", rows.length);
        user.save(function(err, newRow) {
            if (err) {
                res.json({ result: false, err: err });
                return;
            }

            res.json({ result: true, row: newRow });
            return;
        });

    });
});



module.exports = router;
