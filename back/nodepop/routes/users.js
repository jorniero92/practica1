"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res) {
    res.send('respond with a resource');
    console.info("get ok");
    User.list(req.body, function(err, rows) {
        if (err) {
            res.json({ result: false, err: err });
            console.info('error en users.js');
            return;
        }
        res.json({ result: true, users: rows });
        return;
    });

});

router.post('/', function(req, res) {
    console.info("inicio del POST");

    var user = new User(req.body);
    var queryUsuarios = User.find({ nombre: req.body.username, clave: req.body.password });

    //console.info("req body en el post username: ", req.body.username);
    //console.info("req body en el post  password: ", req.body.password);


    queryUsuarios.exec(function(err, rows) {
        console.log(rows);
        if (rows.length == 0) {
            console.info("Vacio");
            res.json({ err: false, row: "vacio" });
            return;
        }
        if (err) {
            console.info("error en promesa usuario login");
            res.json({ err: false, row: "error login" });
            return;
        } else {
            console.info("usuario OK post de users");
            res.json({ err: true, row: rows });
        }

    });
    

});


/*
user.save(function(err, newRow) {
            if (err) {
                console.info("user.save.error");
                res.json({ res: false, err: err });
                return;
            }
            console.info("user.save.OK");
            res.json({ res: true, row: newRow });
            return;
        });


console.info("FIN DEL POST");
});
*/

module.exports = router;
