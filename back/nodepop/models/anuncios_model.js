"use strict";
var mongooseConn = require('../lib/connectMongoose.js');
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var anuncioSchema = mongoose.Schema({
    image: String, 
    name: String,
    categories: [String]
});

// lista
anuncioSchema.statics.list = function(cb) {


    var query = Recipes.find();

    query.exec(function(err, rows) {
        if (err) {
            cb(err);
            return;
        }
        cb(null, rows);
        return;
    });
};

var Recipes = mongoose.model('Recipes', anuncioSchema);
module.exports = Recipes;
