"use strict";

var express = require('express');
var router = express.Router();

// barra algo
router.get('/', function(req, res, next) {
    console.log(req.query);
    res.send('Hola Express1');
});

router.post('/', function(req, res) {
    console.log(req.body);
    res.send('body recogiendo4');
});

//en admin tendremos el router 
module.exports = router;
