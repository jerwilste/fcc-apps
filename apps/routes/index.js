'use strict';

var path = process.cwd();

var PollHandler = require(path + '/apps/polls/controllers/pollHandler.server.js');

module.exports = function (app, passportPolls) {

    function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/');
		}
	}

	var pollHandler = new PollHandler();

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
			pollHandler.getPolls(function(err, r){
				if (err) throw err;
				else {
					if (req.user) {
						res.render(path + '/apps/polls/views/index', {polls: r, auth: req.isAuthenticated(), user: req.user.github.username, list: req.query.list});
					}
					else {
						res.render(path + '/apps/polls/views/index', {polls: r, auth: req.isAuthenticated(), user: null, list: null});
							
					}
				}

			});
		});
	app.route('/ppp/poll')
		.get(function (req, res) {
			pollHandler.getPolls(function(err, r){
				if (err) throw err;
				else {
					if (req.user) {
						
						res.render(path + '/apps/polls/views/poll', {polls: r, auth: req.isAuthenticated(), user: req.user.github.username, linkedPoll: req.query.number});
					}
					else {
						res.render(path + '/apps/polls/views/poll', {polls: r, auth: req.isAuthenticated(), user: null, linkedPoll: req.query.number});
							
					}
				}

			});
		});
	app.route('/ppp/api/polls/:query')
		.get(function (req, res){
			if (req.params.query === "all"){
				pollHandler.getPolls(function(err, r){
					if (err) throw err;
					else res.json(r);
				});
			} 
			else {
				pollHandler.getSpecificPoll(req.params.query, function(err, r){
					if (err) throw err;
					else res.json(r);	
				});
			}
		});
		
	app.route('/ppp/api/polls/add')
		.post(isLoggedIn, function (req,res){
			pollHandler.addPoll(req, res, function(){
				res.redirect('/ppp');
			});
		});
	app.route('/ppp/api/polls/addVote/:number')
		.post(function (req,res){
			pollHandler.addVote(req, res, function(err, r){
				res.json(r);
			});
		});
		
	app.route('/ppp/api/polls/delete')
		.post(isLoggedIn, function (req,res){
			pollHandler.deletePoll(req, res, function(){
				res.redirect('/ppp');
			});
		});	
		
	app.route('/ppp/auth/github')
		.get(passportPolls.authenticate('github'));

	app.route('/ppp/auth/github/callback')
		.get(passportPolls.authenticate('github', {
			successRedirect: '/ppp',
			failureRedirect: '/ppp'
		}));
		
	app.route('/ppp/api/user/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});
		
	app.route('/ppp/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/ppp');
		});
};