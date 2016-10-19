'use strict';

module.exports = {
	'githubAuth': {
		'clientID': process.env.POLLS_GITHUB_KEY,
		'clientSecret': process.env.POLLS_GITHUB_SECRET,
		'C9_callbackURL': 'https://fcc-projects-iloanzi.c9users.io/ppp/auth/github/callback',
		'Heroku_callbackURL': 'https://fcc-apps.herokuapp.com/ppp/auth/github/callback'
	}
};
