var express = require("express"),
	http = require("http"),
	app = express();

// Set up a static file directory to use for default routing
app.use(express.static(__dirname + "/client"));

// Create our Express-powered HTTP server
// and have it listen on port 3000
http.createServer(app).listen(3000);

// Set up our routes
app.get("/", function (req, res) {
	res.send("This is the root route!");
});

// req parameter is an obj that represents the HTTP request coming to the server
// res parameter is an obj that represents the HTTP response sending back to the client
app.get("/hello", function (req, res) {
	// No need to setup HTTP headers in the callbacks because Express does
	// that for us.
	res.send("Hello World from Express-powered HTTP server");
});

app.get("/goodbye", function (req, res) {
	res.send("Goodbye World!");
});