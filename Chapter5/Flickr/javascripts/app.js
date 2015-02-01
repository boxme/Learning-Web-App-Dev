var main = function () {
	"use strict";

	var searchTerm = "singapore";

	// This is actually just one string.
	// but it's spread out over two lines for readablility
	var url = formSearchUrl(searchTerm);

	searchFlickrForPhotos(url);

	var $searchField = $(".search-input input");

	$(".search-input button").on("click", function () {
		searchTerm = $searchField.val();

		if (searchTerm !== "") {
			searchFlickrForPhotos(formSearchUrl(searchTerm));
			$searchField.val("");
		}
	});
};

var searchFlickrForPhotos = function (url) {
	$.getJSON(url, function (flickrResponse) {
		displayFlickrPhotos(flickrResponse);
	});
};

var displayFlickrPhotos = function (flickrResponse) {
	var totalPhotosNum = flickrResponse.items.length;

	var showPhoto = function (index) {
		console.log(index);
		var url = flickrResponse.items[index].media.m;

		// Create a new jQuery element to hold the image
		// but hide it so we can fade it in
		var $img = $("<img>").hide();

		// Set the attribute to the url
		// contained in the response
		$img.attr("src", url);

		// Clear out the current photo
		$("main .photos").empty();

		// Attach the img tag to the main photos element
		$("main .photos").append($img);

		$img.fadeIn();

		setTimeout(function () {
			++index;
			showPhoto(index % totalPhotosNum);
		}, 3000);
	};

	showPhoto(0);
};

var formSearchUrl = function (searchTerm) {
	return "http://api.flickr.com/services/feeds/photos_public.gne" + 
		   "?tags=" + searchTerm + "&format=json&jsoncallback=?";
};

$(document).ready(main);