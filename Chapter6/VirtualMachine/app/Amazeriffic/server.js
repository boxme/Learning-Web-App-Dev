var express = require("express"),
	http = require("http"),
	bodyParser = require("body-parser"),
	app = express(),
	toDos = [
		{
			"description" : "Get groceries",
			"tags" : ["shopping", "chores"]
		},
		{
			"description" : "Make up some new ToDos",
			"tags" : ["writing", "work"]
		},
		{
			"description" : "Prep for Monday's class",
			"tags" : ["work", "teaching"]
		},
		{
			"description" : "Answer emails",
			"tags" : ["work"]
		},
		{
			"description" : "Take Gracie to the park",
			"tags" : ["chores", "pets"]
		},
		{
			"description" : "Finish writing this book",
			"tags" : ["writing", "work"]
		}
	];

app.use(express.static(__dirname + "/client"));

// Tell Express to parse incoming JSON object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}))

http.createServer(app).listen(3000);

// This route takes the place of our 
// todos.json file in example from Chapter 5
app.get("/todos.json", function (req, res) {
	res.json(toDos);
});

app.post("/todos", function (req, res) {
	// The object is now stored in req.body
	var newToDo = req.body;

	console.log(newToDo);

	toDos.push(newToDo);

	// Send back a simple object
	res.json("message: You posted to the server!");
});