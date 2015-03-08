var express = require("express"),
	http = require("http"),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	ToDo = require("./models/todo.js"),
	ToDosController = require("./controllers/todos_controller.js"),
	User = require("./models/user.js"),
	UsersController = require("./controllers/users_controller.js"),
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
app.get("/todos.json", ToDosController.index);
app.get("/todos/:id", ToDosController.show);
app.post("/todos", ToDosController.create);
app.del("/todos/:id", ToDosController.destroy);

// Todos related to the user
app.get("/users/:username/todos.json", ToDosController.index);
app.post("/users/:username/todos", ToDosController.create);
app.put("/users/:username/todos/:id", ToDosController.update);
app.del("/users/:username/todos/:id", ToDosController.destroy);

// These routes are for Users
app.get("/users.json", UsersController.index);
app.post("/users", UsersController.create);
app.get("/users/:username", UsersController.show);
app.put("/users/:username", UsersController.update);
app.del("/users/:username", UsersController.destroy);