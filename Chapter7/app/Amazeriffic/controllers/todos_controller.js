var ToDo = require("../models/todo.js"),
	ToDosController = {},
	UsersController = require("./users_controller.js"),
	User = require("../models/user.js");

ToDosController.respondWithToDos = function (query, callback) {
	ToDo.find(query, function (err, toDos) {
		callback(err, toDos);
	});
};

ToDosController.index = function (req, res) {
	var username = req.params.username || null;

	respondWithToDosResult = function (err, result) {
		if (err !== null) {
			res.status(500).json(err);
		} else {
			res.status(200).json(result);
		}
	};

	if (username !== null) {
		UsersController.checkForUserExistence(username, function (err, isUserFound, result) {
			if (err !== null) {
				res.status(500).json(err);
			} else if (!isUserFound) {
				res.send(404);
			} else {
				ToDosController.respondWithToDos({"owner": result[0]._id}, respondWithToDosResult);
			}
		});
	} else {
		ToDosController.respondWithToDos({}, respondWithToDosResult);
	}
};

ToDosController.create = function (req, res) {
	var username = req.params.username || null;
	var newToDo = new ToDo({"description": req.body.description,
							"tags": req.body.tags});

	UsersController.checkForUserExistence(username, function (err, isUserFound, result) {
		if (err !== null) {
			res.status(500).json(err);
			return;
		} else if (!isUserFound) {
			newToDo.owner = null;
		} else {
			newToDo.owner = result[0]._id;
		}

		newToDo.save(function (err, savedResult) {
			console.log(savedResult);
			if (err !== null) {
				res.status(500).json(err);
			} else {
				res.status(200).json(savedResult);
			}
		});
	});
};

ToDosController.show = function (req, res) {
	// This is the id that gets sent to the url
	var id = req.params.id;

	// find the ToDo item with the associated id
	ToDosController.respondWithToDos({"_id": id}, function (err, toDos) {
		if (err !== null) {
			res.status(500).json(err);
		} else if (toDos.length > 0) {
			res.status(200).json(toDos[0]);
		} else {
			res.status(404).send({});
		}
	});
};

ToDosController.update = function (req, res) {
	console.log("todos update action called");
	res.sendStatus(200);
};

ToDosController.destroy = function (req, res) {
	var id = req.params.id;

	ToDo.remove({"_id": id}, function (err) {
		if (err !== null) {
			console.log(id + " delete failed");
			res.status(500).json(err);
		} else {
			res.sendStatus(200);
		}
	});
};

module.exports = ToDosController;