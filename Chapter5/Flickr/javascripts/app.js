var main = function() {
	"use strict";

	// This is actually just one string.
	// but it's spread out over two lines for readablility
	var url = "http://api.flickr.com/services/feeds/photos_public.gne" + 
			  "?tags=singapore&format=json&jsoncallback=?";

	$.getJSON(url, function(flickrResponse) {
		flickrResponse.items.forEach(function (photo) {
			// Create a new jQuery element to hold the image
			// but hide it so we can fade it in
			var $img = $("<img>").hide();

			// Set the attribute to the url
			// contained in the response
			$img.attr("src", photo.media.m);

			// Attach the img tag to the main photos element
			$("main .photos").append($img);
			$img.fadeIn();
		});
	});

};

$(document).ready(main);