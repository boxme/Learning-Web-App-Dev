var ToDo = require("../models/todo.js"),
	ToDosController = {};

ToDosController.index = function (req, res) {
	ToDo.find({}, function (err, toDos) {
		if (err !== null) {
			return;
		}
		res.json(toDos);
	});
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

module.exports = ToDosController;