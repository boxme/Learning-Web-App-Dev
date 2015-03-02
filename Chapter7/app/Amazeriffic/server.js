var express = require("express"),
	http = require("http"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	ToDo = require("./models/todo.js"),
	app = express();

app.use(express.static(__dirname + "/client"));

// Connect to the amazeriffic data store in mongo
mongoose.connect("mongodb://localhost/amazeriffic");

// Tell Express to parse incoming JSON object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}))

http.createServer(app).listen(3000);

// This route takes the place of our 
// todos.json file in example from Chapter 5
app.get("/todos.json", function (req, res) {
	ToDo.find({}, function (err, toDos) {
		if (err !== null) {
			return;
		}
		res.json(toDos);
	});
});

app.post("/todos", function (req, res) {

	var newToDo = new ToDo({"description": req.body.description,
							"tags": req.body.tags});
	newToDo.save(function (err, result) {
		if (err !== null) {
			console.log(err);
			res.send("Error");
		} else {
			res.json(result);
		}
	});
});