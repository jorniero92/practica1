"use strict";
var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var auth = require('../../../lib/auth');
var Recipe = mongoose.model('Recipes');
//var hash = require('hash.js');

router.get('/', function(req, res) {
    console.log("aqui get");
    Recipe.list(function(err, rows) {
        if (err) {
            res.json({ result: false, err: err });
            console.info('error en recipe.js');
            return;
        }
        res.json({ result: true, recipes: rows });
        return;
    });
});


router.post('/', function(req, res) {
    //res.send('hola soy post');
    console.log("Body: ", req.body);
    var recipe = new Recipe(req.body);
    recipe.save(function(err, newRecipe) {
        if (err) {
            res.status(400).json({ result: false, err: err });
            return;
        }
        //comprobar si ya esta la receta
        res.status(200).json({ result: true, recipe: newRecipe });
    });
});

module.exports = router;
