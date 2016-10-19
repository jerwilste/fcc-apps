'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	id: String,
	number: Number,
	owner: String,
	question: String,
    answers: Array
	
});

module.exports = mongoose.model('Poll', Poll);

