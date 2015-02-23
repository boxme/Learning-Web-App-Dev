var ntwitter = require("ntwitter"),
	credentials = require("./credentials.json"),
	twitter,
	counts = {};

var setupTweetCounter = function (trackWords) {
	trackWords.forEach(function (word) {
		counts[word] = 0;
	});

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
		{ "track" : trackWords },

		// Third parameter is our callback for when the stream is created
		function (stream) {

			// Listen for "data", which is fired whenever a new tweet comes through
			// the stream
			stream.on("data", function (tweet) {
				trackWords.forEach(function (trackWord) {
					if (tweet.text.indexOf(trackWord) > -1) {
						counts[trackWord]++;
					}
				});
			});
		}
	);

	return counts;
};

// Print the awesome count every 3 seconds
setInterval(function () {
	console.log("awesome: " + counts["awesome"]);
}, 3000);

module.exports = setupTweetCounter;