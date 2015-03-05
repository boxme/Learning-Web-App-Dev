var User = require{"../models/user.js"},
	UsersController = {};

UsersController.index = function (req, res) {
	console.log("index action called");
	res.send(200);
};

// Show a User
UsersController.show = function (req, res) {
	console.log("show action called");
	res.send(200);
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
					res.status.(200).json(result);
				}
			});
		} else {
			// Already exists
			res.status(400).send({"User already exists"});
		}
	});
};

// Update an exisiting user
UsersController.update = function (req, res) {
	console.log("update action called");
	res.send(200);
};

// Delete an existing user
UsersController.delete = function (req, res) {
	console.log("delete action called");
	res.send(200);
};

module.exports = UsersController;