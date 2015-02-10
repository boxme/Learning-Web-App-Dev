var main = function () {
	"use strict";

	var insertCountsIntoDOM = function (wordCounts) {
		// Now 'wordCounts' will be the object that
		// is returned by the counts.json route we 
		// set up in Express
		$("p").text("awesome: " + wordCounts.awesome);
	};

	// Check the counts value every 3 seconds
	// insert the updated version into the DOM
	setInterval(function () {

		// getJSON is connecting to the counts.json route we set
		// up in Express
		$.getJSON("/counts.json", insertCountsIntoDOM);

	}, 3000);

	$.getJSON("/counts.json", insertCountsIntoDOM);
};

$(document).ready(main);