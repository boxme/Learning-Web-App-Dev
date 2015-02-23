var ntwitter = require("ntwitter"),
	credentials = require("./credentials.json"),
	redis = require("redis"),
	redisClient,
	twitter,
	counts = {};

var setupTweetCounterWithGet = function (trackWords) {
	// Set up our twitter object
	twitter = ntwitter(credentials);

	// Create a client to connect to Redis
	redisClient = redis.createClient();

	var numOfTrackWords = trackWords.length,
		currentWordCount = 0;

	trackWords.forEach(function (word) {
		counts[word] = 0;
		currentWordCount++;

		// The callback gets two arguments
		redisClient.get(word, function (err, wordCount) {
			// check to make sure there's no error
			if (err !== null) {
				console.log("Error: " + err);
				return;
			}

			// Parse number value from the string Redis returns
			// second parameter is radix, 10 means base-10
			counts[word] = parseInt(wordCount, 10) || 0;

			if (currentWordCount === numOfTrackWords) {
				setupTwitterStream(trackWords);
			}
		});
	});

	return counts;
};

var setupTweetCounterWithMget = function (trackWords) {
	// Set up our twitter object
	twitter = ntwitter(credentials);

	// Create a client to connect to Redis
	redisClient = redis.createClient();

	var numOfTrackWords = trackWords.length,
		currentWordCount = 0;

	trackWords.forEach(function (word) {
		counts[word] = 0;
	});

	redisClient.mget(trackWords, function (err, results) {
		if (err !== null) {
			console.log("Error: " + err);
			return;
		}

		trackWords.forEach(function (word) {
			counts[word] = parseInt(results[currentWordCount++], 10) || 0;
		});

		setupTwitterStream(trackWords);
	});

	return counts;
};

var setupTwitterStream = function (trackWords) {
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
						// Increment the key on the client
						redisClient.incr(trackWord);
						counts[trackWord]++;
					}
				});
			});
		}
	);
};

// Print the awesome count every 3 seconds
setInterval(function () {
	console.log("awesome: " + counts["awesome"]);
}, 3000);

module.exports = setupTweetCounterWithGet;