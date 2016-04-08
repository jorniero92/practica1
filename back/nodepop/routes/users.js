"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res) {
    //res.send('respond with a resource');
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

    var user = new User(req.body);
    var queryUsuarios = User.find({ nombre: req.body.username, clave: req.body.password });

    queryUsuarios.exec(function(err, rows) {
        //console.log(rows);
        if (rows.length == 0) {
            console.info("Vacio, no se encuentra usuario");
            res.json({ err: false, row: "vacio, no se encuentra usuario" });
            return;
        }
        if (err) {
            console.info("error en promesa usuario login");
            res.json({ err: false, row: "error login" });
            return;
        } else {
            console.info("usuario OK post de users");
            res.json({ err: true, row: rows });
        }

    });
    

});


module.exports = router;
