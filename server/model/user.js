var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  oauthID: Number,
  accessToken: String,
  name: String,
  created: Date
});


module.exports = mongoose.model('User', UserSchema);
