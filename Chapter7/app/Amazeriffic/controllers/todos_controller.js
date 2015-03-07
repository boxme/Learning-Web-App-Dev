var ToDo = require("../models/todo.js"),
	ToDosController = {},
	User = require("../models/user.js");

ToDosController.index = function (req, res) {
	var username = req.params.username || null;
	var respondWithToDos;

	// Helper function that gets ToDos based on a query
	respondWithToDos = function (query) {
		ToDo.find(query, function (err, toDos) {
			if (err !== null) {
				res.status(500).json(err);
			} else {
				res.status(200).json(toDos);
			}
		});
	};

	if (username !== null) {
		User.find({"username": username}, function (err, result) {
			if (err !== null) {
				res.status(500).json(err);
			} else if (result.length === 0) {
				res.send(404);
			} else {
				respondWithToDos({"owner": result[0].id});
			}
		});
	} else {
		respondWithToDos({});
	}
};

ToDosController.create = function (req, res) {
	var newToDo = new ToDo({"description": req.body.description,
							"tags": req.body.tags});
	newToDo.save(function (err, result) {
		console.log(result);

		if (err !== null) {
			// The element did not get saved
			console.log(err);
			res.status(500).json(err);
		} else {
			res.status(200).json(result);
		}
	});
};

ToDosController.show = function (req, res) {
	// This is the id that gets sent to the url
	var id = req.params.id;

	// find the ToDo item with the associated id
	ToDo.find({"_id":id}, function (err, toDos) {
		if (err !== null) {
			res.status(500).json(err);
		} else {
			if (toDos.length > 0) {
				res.status(200).json(toDos[0]);
			} else {
				res.status(404).send({});
			}
		}
	});
};

ToDosController.update = function (req, res) {
	console.log("todos update action called");
	res.send(200);
};

ToDosController.destroy = function (req, res) {
console.log("todos destroy action called");
	res.send(200);
};

module.exports = ToDosController;