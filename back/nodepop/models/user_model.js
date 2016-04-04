"use strict";
var mongooseConn = require('../lib/connectMongoose.js');
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

var usuarioSchema = mongoose.Schema({
	
	nombre:{
		type: String,
		unique: true,
		sparse: true
	},

	email:{
		type: String,
		unique: true,
		sparse: true
	},

	clave: String,
});


// lista
usuarioSchema.statics.list = function(sort, cb){

	var query = User.find({});
	
	query.sort(sort);
	query.select();
	query.exec(function(err, rows){
		if(err){
			cb(err);
			return;
		}
		cb(null, rows);
		return;
	});
};


//lo registro en mongoose
var User = mongoose.model('User', usuarioSchema);
//exportamos en usuario "User"
module.exports = User;