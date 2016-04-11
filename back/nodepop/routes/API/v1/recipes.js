"use strict";
var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var auth = require('../../../lib/auth');
var Recipe = mongoose.model('Recipes');

router.get('/', function(req, res) {
    console.log("aqui get recipe list.js");
    Recipe.list(function(err, rows) {
        if (err) {
            console.info('error en recipe.js');
            res.json({ result: false, err: err });            
            return;
        }
        res.json({ result: true, recipes: rows });
        return;
    });
});



router.post('/', function(req, res) {

    console.log("Body: ", req.body);
    var recipe = new Recipe(req.body);
    recipe.save(function(err, newRecipe) {
        if (err) {
            res.status(400).json({ result: false, err: err });
            return;
        }
        //comprobar si ya esta la receta
        //res.status(200).json({ result: true, recipe: newRecipe });
        res.status(200).json({ result: true, recipe: newRecipe });
    });
});

module.exports = router;
