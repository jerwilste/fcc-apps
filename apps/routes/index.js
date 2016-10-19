'use strict';

var path = process.cwd();

module.exports = function (app, passport) {

	app.route('/')
		.get(function (req, res) {
		    res.sendFile(path + '/public/index.html');
		});
		
	app.route('/rogue')
	    .get(function (req, res) {
		    res.sendFile(path + '/apps/rogue/rogue.html');
		});
};