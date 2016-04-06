"use strict";
var mongoose = require('mongoose');

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

	clave: String
});


// lista
usuarioSchema.statics.list = function(sort, cb){

	var query = User.find({});
	query.sort(sort);
	query.exec(function(err, rows){
		if(err){
			cb(err);
			return;
		}
		cb(null, rows);
		return;
	});
};

var Usuario = mongoose.model('Usuario', usuarioSchema);