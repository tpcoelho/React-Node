var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var routes = require('./server/routes/routes');
var config = require('./server/config/database'); // get db config file

mongoose.connect(config.database, function(error, db) {
    if (error) {
      console.log('\nErro na conexão com o mongodb.\n');
      console.log(error);
      process.exit(1);
    }else{
			console.log('Mongo esta conectado');

    }
});

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());

require('./server/config/passport')(passport);

/* Start the routes: */
app.use('/', routes);

// tell the app to look for static files in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

app.listen(3000, function(){
	console.log('Server is running on http://localhost:3000');
})
