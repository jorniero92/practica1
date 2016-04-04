"use strict";

var basicAuth = require('basic-auth');
var mongoose = require('mongoose');
//var User = mongoose.model('user_moel.js');
var userModel = require('../models/user_model.js');

var fn = function(user, pass) {
        return function(req, res, next) {
            var userRequest = basicAuth(req); //sacar del req el usuario
            console.info('user Request:', userRequest);
            console.info('user:', userRequest.name);
            console.info('pass:', userRequest.pass);


            var results = userModel.findOne({ nombre: userRequest.name, clave: userRequest.pass }, function(err, doc) {
                console.info("doc", doc);
                if (err) {
                    next(err);
                    return;
                }
                if (!doc) {
                    console.info("No estas registrado");
                    res.set('www-Authenticate', 'Basic realm=Authorization Required');
                    res.send(401);
                    // res.json({ result: false, error: 'invalid credentials' });
                    return;
                }
                next();

            });

        }
    }
module.exports = fn;