"use strict";
var mongooseConn = require('../lib/connectMongoose.js');

var mongoose = require('mongoose');


var express = require('express');
var router = express.Router();

var anuncioSchema = mongoose.Schema({
    nombre: {
        type: String,
        unique: true,
        sparse: true
    },
    venta: Boolean,
    precio: Number,
    foto: {
        type: String,
        unique: true,
        sparse: true
    },
    tags: [String]
});


// lista
anuncioSchema.statics.list = function(filtro, sort, cb) {


    var query = Anuncios.find(filtro);
    //ejecutarlo
    query.sort(sort); //solo ordena
    query.select();
    query.exec(function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        cb(null, rows);
        return;
    });
};

var Anuncios = mongoose.model('Anuncios', anuncioSchema);
module.exports = Anuncios;
