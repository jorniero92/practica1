"use strict";

var express = require('express');
var router = express.Router();

// barra algo
router.get('/', auth(), function(req, res, next) {
    console.info("get del amdmin.js");
    res.send('Hola Express1');
});

router.post('/', function(req, res) {
    console.info("post del amdmin.js");
    res.send('body recogiendo4');
});

//en admin tendremos el router 
module.exports = router;
