var User = require('../model/user');
var config = require('../config/database');

var functions = {

	login: function(req, res){
	  User.findById(req.user, function(err, user) {
	    if(err) {
	      console.log(err);  // handle errors
	    } else {
				res.redirect('/?name='+req.user.name);
	    }
	  });
	},
	ping: function(req, res){
	  res.send("pong!", 200);
	}
  
}

module.exports = functions;