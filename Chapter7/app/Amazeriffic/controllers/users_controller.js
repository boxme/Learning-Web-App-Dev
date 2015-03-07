var User = require("../models/user.js"),
	UsersController = {};

UsersController.index = function (req, res) {
	console.log("index action called");
	res.send(200);
};

// Show a User
UsersController.show = function (req, res) {
	console.log("show action called");
	var userName = req.params.username;
	checkForUserExistence(userName, function (err, userExists) {
		if (err !== null) {
			console.log(err);
			res.send(500, err);
		} else if (userExists) {
			// Send the basic HTML file representing the view
			console.log("user found");
			// res.status(200).sendfile("../client/index.html");
		} else {
			console.log("user not found");
			res.send(404);
		}
	});
};

// Create a new user
UsersController.create = function (req, res) {
	console.log("create action called");
	var userName = req.body.username;

	// Checks to see if the User with this username already exists
	User.find({"username": username}, function (err, result) {
		if (err !== null) {
			console.log(err);
		} else if (result.length === 0) {
			// No User with this username is found
			console.log("Creating User...");
			var exampleUser = new User({"username" : username});
			exampleUser.save(function (err, result) {
				if (err !== null) {
					console.log(err);
				} else {
					console.log("Saved Example User");
					res.status(200).json(result);
				}
			});
		} else {
			// Already exists
			res.status(400).send("User already exists");
		}
	});
};

// Update an exisiting user
UsersController.update = function (req, res) {
	console.log("update action called");
	res.send(200);
};

// Delete an existing user
UsersController.destroy = function (req, res) {
	console.log("delete action called");
	res.send(200);
};

var checkForUserExistence = function (username, callback) {
	User.find({"username": username}, function (err, result) {
		if (err !== null) {
			callback(err, false);
		} else if (result.length === 0) {
			return callback(err, false);
		} else {
			// Already exists
			return callback(err, true);
		}
	});
};

module.exports = UsersController;