"use strict";
var express = require('express');
var router = express.Router();
require('./models/user_model');

var mongoose = require('mongoose');
var User = mongoose.model('User');
var fs = require('fs');


inicializarUsuarios();

function inicializarUsuarios() {
    fs.readFile('usuarios.json/', function(err, data) {
        if (err) {
            console.log("error al leer usuario");
            return;
        }
        var paquete = JSON.parse(data); //convierte el string d utf8 en un string

        var ver = paquete.usuarios;
        for (var i = 0; i < ver.length; i++) {
            console.log(ver[i]);
            var usuarios = new User(ver[i]);
            console.log("insertado", i);

            usuarios.save(function(err, newRow) {
                if (err) {
                    console.log("error al guardar usuarios");
                    return { result: false, err: err };
                }
                console.log(" Usuario guardado");
                return { result: true, err: newRow };
            });
        };
        console.log('FIN');
    });
};
