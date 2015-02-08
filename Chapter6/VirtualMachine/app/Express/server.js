var express = require("express");
var http = require("http");
var app = express();

// Set up a static file directory to use for default routing
app.use(express.static(__dirname + "/client"));

// Create our Express-powered HTTP server
// and have it listen on port 3000
http.createServer(app).listen(3000);

// Set up our routes
app.get("/", function (req, res) {
	res.send("This is the root route!");
});

app.get("/hello", function (req, res) {
	// No need to setup HTTP headers in the callbacks because Express does
	// that for us.
	res.send("Hello World from Express-powered HTTP server");
});

app.get("/goodbye", function (req, res) {
	res.send("Goodbye World!");
});