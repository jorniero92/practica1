"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncios = mongoose.model('Anuncios');
var auth = require('../lib/auth');

/* devuelve toda lita de anunios con todos los campos*/
router.get('/', auth(), function(req, res, next) {

    var sort = req.query.sort;

    let filtro = {};
    console.log(req.query.start);
    
    if (typeof req.query.tags !== 'undefined') {
        var arregloDeCadenas = (req.query.tags).split("-");

        if (arregloDeCadenas.length == 1) {
            var unico = arregloDeCadenas[0];
            filtro.tags = unico;
        };

        if (arregloDeCadenas.length == 2) {
            var tag1 = arregloDeCadenas[0];
            var tag2 = arregloDeCadenas[1];
            if (min === '') {
                console.log('1 tag erroneo');
                res.json({ result: false, err: 'error por min incorrecto' });
                return;
            } else if (max === '') {
                console.log('2 tag erroneo');
                res.json({ result: false, err: 'error por max incorrecto' });
            } else {
                console.log('hay 2 tags');
                filtro.precio = { tag1, tag2 };
            }
        };
    }; //por tags

    if (typeof req.query.venta !== 'undefined') {
        //console.log("ventaaaa", req.query.venta);
        if (req.query.venta == 'true') {
            console.log('venta correcta');
            filtro.venta = req.query.venta;
        } else if (req.query.venta == 'false') {
            console.log('venta falsa');
            filtro.venta = req.query.venta;
        } else {
            //console.log('error por venta incorrecta');
            res.json({ result: false, err: 'error por venta incorrecta' });
        }
    }; //por tipo de anuncio

    if (typeof req.query.precio !== 'undefined') {

        var arregloDeCadenas = (req.query.precio).split("-");

        if (arregloDeCadenas.length == 1) {
            var max = arregloDeCadenas[0];
            filtro.precio = max;
        };

        if (arregloDeCadenas.length == 2) {
            var min = arregloDeCadenas[0];
            var max = arregloDeCadenas[1];

            if (min === '') {
                filtro.precio = { $lte: max };
            } else if (max === '') {
                filtro.precio = { $gte: min };
            } else {
                filtro.precio = { $gte: min, $lte: max };
            }
        };
    }; //por rango de precio

    if (typeof req.query.nombre !== 'undefined') {
        //con expresion regular
    }; //por nombre de articulo.

    Anuncios.list(filtro, sort, function(err, rows) {
        if (err) {
            res.json({ result: false, err: err });
            console.log('errors en anuncios.js');
            return;
        }

        if (rows.length == 0) {
            console.log("no hay coindicencias");
            res.json({ result: false, err: 'no hay coindicencias' });
            return;
        } else {
            res.json({ result: true, anuncios: rows });
            return;
        }
    });

});


//añadir anuncio
router.post('/', function(req, res) {

    var anuncios = new Anuncios(req.body);
    var queryAuncios = Anuncios.find({ nombre: req.body.name }, function(err, rows) {
        console.log(rows.length);
        if (err) {
            console.log("Anuncio ya adscrito con igual nombre: ", req.body.name);
            return;
        }

        if (rows.length === 0) {
            anuncios.save(function(err, newRow) {
                if (err) {
                    res.json({ result: false, err: err });

                    return;
                }

                res.json({ result: true, row: newRow });
                return;
            });
        }


    });

    console.log("no se ha guardado el anuncio");
    return;
});

module.exports = router;
