"use strict";

var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
//var Item = mongoose.model('Item');
var auth = require('../../../lib/auth');
//var hash = require('hash.js');


router.get('/users', function(req, res, next) {
    var sort = req.query.sort || 'nickname';
    Usuario.list(sort, function(err, rows) {
        if (err) {
            res.status(400).json({
                result: false,
                status: 'Bad Request',
                err: err
            });
        }
        res.status(200).json({
            result: true,
            status: 'OK',
            usuarios: rows
        });
    });
});

router.get('/items', function(req, res, next) {
    var sort = req.query.sort || 'titulo';
    var tipo = req.query.tipo;
    var filtro = {};
    if (typeof req.query.tipo !== "undefined")
        filtro.tipo = req.query.tipo;
    if (typeof req.query.genero !== "undefined")
        filtro.genero = req.query.genero;

    Item.list(filtro, sort, function(err, rows) {
        if (err) {
            res.status(400).json({
                result: false,
                status: 'Bad Request',
                err: err
            });
        }
        res.status(200).json({
            result: true,
            status: 'OK',
            items: rows
        });
    });
});
router.get('/items/:id', function(req, res) {
    var search_item = Item.find({
        _id: req.params.id
    });
    search_item.exec(function(err, row) {
        if (err) {
            res.status(400).json({
                result: false,
                status: 'Bad Request',
                err: err
            });
        }
        res.status(200).json({
            result: true,
            status: 'OK',
            item: row
        });

    });
});
router.post('/users', function(req, res) {

    var user = new Usuario(req.body);
    //req.body.password = hash.sha256().update(req.body.password).digest('hex');
    var nuevo_usuario = Usuario.find({
        nickname: req.body.nickname
    });
    nuevo_usuario.exec(function(err, rows) {
        if (err) {
            return;
        }
        if (rows.length > 0) {
            res.status(409).json({
                result: false,
                status: "conflict",
                info: "nicknameRegistrado",
            });
        } else {
            //guardamos usuario en la BD:
            user.save(function(err, newUser) {
                if (err) {
                    res.status(400).json({
                        result: false,
                        status: 'Bad Request',
                        err: err
                    });
                    return;
                }
                res.status(200).json({
                    result: true,
                    status: 'OK',
                    usuario: newUser
                });
            });
        }

    });


});

router.post('/items', function(req, res) {
    var item = new Item(req.body);
    item.save(function(err, newItem) {
        if (err) {
            res.status(400).json({
                result: false,
                status: 'Bad Request',
                err: err
            });
            return;
        }
        res.status(200).json({
            result: true,
            status: 'OK',
            item: newItem
        });
    });

});
router.post('/login', function(req, res) {
    //var user = new Usuario(req.body);
    var login_usuario = Usuario.find({
        nickname: req.body.nickname,
        password: req.body.password
    });
    login_usuario.exec(function(err, rows) {
        if (err) {
            return;
        }
        if (rows.length == 0) {
            res.status(401).json({
                result:false,
                info: "passOrNickInvalid",
            });
        } else {
            res.status(200).json({
                result:true,
                info: "LoginOK"
            })
        }

    });
});
router.put('/users/:id', function(req, res) {
    req.body.password = hash.sha256().update(req.body.password).digest('hex');
    Usuario.update({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        multi: true
    }, function(err, data) {
        if (err) {
            res.json({
                result: false,
                err: err
            });
            return;
        }
        res.json({
            result: true,
            row: data
        });
    });

});

router.put('/items/:id', function(req, res) {
    Item.update({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        multi: true
    }, function(err, data) {
        if (err) {
            res.json({
                result: false,
                err: err
            });
            return;
        }
        res.json({
            result: true,
            row: data
        });
    });
});
module.exports = router;
