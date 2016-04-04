"use strict";

var basicAuth = require('basic-auth');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var userModel = require('../models/user_model.js');



var fn = function(user, pass) {
        return function(req, res, next) {
            var userRequest = basicAuth(req); //sacar del req el usuario
            console.log('userRequest:', userRequest);

            var results = User.findOne({ nombre: userRequest.name, clave: userRequest.pass }, function(err, doc) {
                console.log('find', err, doc);
                if (err) {
                    next(err);
                    return;
                }
                if (!doc) {
                    res.set('www-Authenticate', 'Basic realm=Authorization Required');
                    res.send(401);
                    // res.json({ result: false, error: 'invalid credentials' });
                    return;
                }
                next();

            });

        }
    }
    //var usuarioBD = function()
module.exports = fn;