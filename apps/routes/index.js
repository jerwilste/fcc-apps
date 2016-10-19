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
		
    app.route('/rogue')
	    .get(function (req, res) {
		    res.sendFile(path + '/apps/rogue/rogue.html');
		});
		
	app.route('/ppp')
	    .get(function (req, res) {
		    res.render(path + '/apps/polls/views/index', {polls: [{question: 'hello', answers: [{answer: 'hi', voteNum: 0}]}], auth: null, user: null, list: null});
		});
};