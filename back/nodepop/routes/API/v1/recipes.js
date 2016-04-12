"use strict";
var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var auth = require('../../../lib/auth');
var Recipe = mongoose.model('Recipes');

router.get('/', function(req, res) {
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

router.get('/recipeDetail/:id', function(req, res) {

    var query = Recipe.find({ _id: req.params.id });
    query.exec(function(err, data){
         if (err) {
            res.json({ result: false, err: err });
            return;
        }
        console.log("data: ", data);
        res.json({ result: true, recipe: data });
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
        res.status(200).json({ result: true, recipe: newRecipe });
    });
});

module.exports = router;
