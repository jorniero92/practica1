"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
//var User = mongoose.model('User');

router.get('/' , function(req, res) {});
router.get('/', function(req, res) {
    res.send('respond with a resource');

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

router.post('/', function(req, res) {
    //en user.clave y user.nombre
    var user = new User(req.body);

    var queryUsuarios = User.find({ nombre: user.nombre });
    console.info("queryUsuarios nombre post: ", queryUsuarios.nombre);
    //console.info("pass en post: ", req.body.clave);
    if (user.clave == queryUsuarios.clave) {
        res.json({ result: true, row: row });
        return;
    } else {
        queryUsuarios.exec(function(err, rows) {

            if (err) {
                res.json({ result: false, err: " error query" });
                return;
            }

            user.save(function(err, newRow) {
                if (err) {
                    res.json({ result: false, err: err });
                    return;
                }

                res.json({ result: true, row: newRow });
                return;
            });
        });
    }
    //devolver algo si no esta la clave
});


module.exports = router;
