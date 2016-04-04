"use strict";
var express = require('express');
var router = express.Router();
require('./models/anuncios_model');

var mongoose = require('mongoose');
var Anuncios = mongoose.model('Anuncios');
var fs = require('fs');


inicializarAnuncios();

function inicializarAnuncios() {
    fs.readFile('anuncios.json/', function(err, data) {
        if (err) {
            console.log("error al leer");
            return;
        }
        var paquete = JSON.parse(data); //convierte el string d utf8 en un string

        var ver = paquete.anuncios;
        //console.log(ver);
        for (var i = 0; i < ver.length; i++) {
            console.log(ver[i]);
            var anuncios = new Anuncios(ver[i]);
            //console.log("insertado", i);
            anuncios.save(function(err, newRow) {
                if (err) {
                    console.log("error al guardar anuncio111111");
                    return { result: false, err: err };
                    
                } else {
                    console.log(" anuncio guardado");
                    return { result: true, err: newRow };
                
                }
            });
        };
        console.log('FIN');
    });
};
