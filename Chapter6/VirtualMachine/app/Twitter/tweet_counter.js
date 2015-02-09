var ntwitter = require("ntwitter"),
	credentials = require("./credentials.json"),
	twitter,
	counts = {};

counts.awesome = 0;
counts.cool = 0;
counts.rad = 0;
counts.gnarly = 0;
counts.groovy = 0;

// Set up our twitter object
twitter = ntwitter(credentials);

// Set up our twitter stream with three parameters
// seperated by commas
twitter.stream(
	// The first parameter is a string representing the 
	// type of stream; filter tweets by a list of words
	"statuses/filter",

	// Second parameter, an object containing an array
	// of information for the filter rule
	{ "track" : ["awesome", "cool", "rad", "gnarly", "groovy"] },

	// Third parameter is our callback for when the stream is created
	function (stream) {

		// Listen for "data", which is fired whenever a new tweet comes through
		// the stream
		stream.on("data", function (tweet) {
			if (tweet.text.indexOf("awesome") > -1) {
				counts.awesome++;
			}
		});
	}
);

// Print the awesome count every 3 seconds
setInterval(function () {
	console.log("awesome: " + counts.awesome);
}, 3000);