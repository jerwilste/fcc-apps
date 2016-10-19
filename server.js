'use strict';

var express = require('express');
var routes = require('./apps/routes/index.js');
//var mongoose = require('mongoose');
//var passportPolls = require('passport');
//var session = require('express-session');

var app = express();

var bodyparser = require('body-parser');
app.use(bodyparser.json() );       // to support JSON-encoded bodies
app.use(bodyparser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

require('dotenv').load();
//require('./apps/polls/config/passport')(passportPolls);

/*mongoose.connect('mongodb://heroku_f082b2cm:u5p2jn1tb2mj8au9mb45glf6fo@ds031978.mlab.com:31978/heroku_f082b2', function(err){
/    if (err) {
    throw new Error('Database failed to connect!');
  } else {
    console.log('Successfully connected to MongoDB on port 27017.');
  }
});*/



app.use('/polls', express.static(process.cwd() + '/apps/polls/'));
app.use('/common', express.static(process.cwd() + '/apps/common/'));

//var UsersPPP = require('./apps/polls/models/users.js');

/*app.use(session({
	secret: 'secretFCC',
	resave: false,
	saveUninitialized: true
}));

app.use(passportPolls.initialize());
app.use(passportPolls.session());*/

app.set('view engine', 'ejs');

//routes(app, passportPolls);

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});