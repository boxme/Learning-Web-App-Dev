var express = require("express"),
	http = require("http"),
	tweetCounts = require("./tweet_counter.js"),
	app = express();

// Configure the app to use the client directory for static file
app.use(express.static(__dirname +  "/client"));

// Create the server and have it listen
http.createServer(app).listen(3000);

// Set up routes
app.get("/counts.json", function (req, res) {
	// res.json returns the entire object as JSON file	
	res.json(tweetCounts);
});