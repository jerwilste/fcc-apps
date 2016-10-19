'use strict';

var express = require('express');
var routes = require('./apps/routes/index.js');
var app = express();

app.use('/polls', express.static(process.cwd() + '/apps/polls/'));
app.use('/common', express.static(process.cwd() + '/apps/common/'));

app.set('view engine', 'ejs');

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});