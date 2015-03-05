var mongoose = require("mongoose");

// This is our mongoose model for users
var UserSchema = mongoose.Schema({
	userName: String
});

var User = mongoose.model("User", UserSchema);

module.exports = User;