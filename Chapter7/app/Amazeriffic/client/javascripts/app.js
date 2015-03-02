// Global variables
var toDos,
	toDoObjectss,
	tabs = [];

var main = function () {
	"use strict";

	updateToDos();
	tabs = createTabsClass();

	tabs.forEach(function (tab) {
		var $aElement = $("<a>").attr("href", ""),
			$spanElement = $("<span>").text(tab.name);

		$aElement.append($spanElement);
		$(".tabs").append($aElement);

		$spanElement.on("click", function () {
			// make all the tabs inactive
			$(".tabs span").removeClass("active");
			$spanElement.addClass("active");
			
			// empty the main content so we can recreate it
			$("main .content").empty();

			tab.content(function (error, $content) {
				if (error !== null) {
					console.log(error);
					alert("Error retrieving data: " + error);
				} else {
					$("main .content").append($content);
				}
			});
			return false;
		});
	});

	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
	$.getJSON("/todos.json", function (toDoObjects) {
		toDoObjectss = toDoObjects;
		main();
	});
});

var updateToDos = function () {
	toDos = createToDoListFromObjects(toDoObjectss);
};

var createTabsClass = function () {
	// Add the 'Newest' tab
	tabs.push({
		"name": "Newest",
		"content": function(callback) {
			$.getJSON("/todos.json", function (toDoObjects) {
				toDoObjectss = toDoObjects;
				updateToDos();

				var $content = $("<ul>");
				toDos.forEach(function (todo) {
               		$content.prepend($("<li>").text(todo));
           		});

           		callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				// jqXHR is a superset of the browser's native XMLHttpRequest object
				// Send the error along with null for the $content
				callback(error, null);
			});
		}
	});

	// Add the 'Oldest' tab
	tabs.push({
		"name": "Oldest",
		"content": function (callback) {
			$.getJSON("/todos.json", function (toDoObjects) {
				toDoObjectss = toDoObjects;
				updateToDos();

				var $content = $("<ul>");
				toDos.forEach(function (todo) {
       	     		$content.append($("<li>").text(todo));
           		});
           		callback(null, $content);
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	// Add the 'Tags' tab
	tabs.push({
		"name": "Tags",
		"content": function (callback) {
			$.getJSON("/todos.json", function (toDoObjects) {
				toDoObjectss = toDoObjects;
				updateToDos();

				var organizedByTag = organizedByTagBookSoln(toDoObjectss);
				var $content = $("<ul>");

				organizedByTag.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name);
					var $toDoDescription = $("<ul>");

					tag.toDos.forEach(function (desciption) {
						var $li = $("<li>").text(desciption);
						$toDoDescription.append($li);
					});

					$content.append($tagName);
					$content.append($toDoDescription);
					callback(null, $content);
				});
			}).fail(function (jqXHR, textStatus, error) {
				callback(error, null);
			});
		}
	});

	// Add the 'Add' tab
	tabs.push({
		"name": "Add",
		"content": function (callback) {
			var $inputLabel = $("<p>").text("Description: ");
			var $input = $("<input>").addClass("description");

			var $tagLabel = $("<p>").text("Tags: ");
			var $tagInput = $("<input>").addClass("tags");
			var $button = $("<button>").text("+");

			$button.on("click", function () {
				var newToDo = $input.val();
				var tags = $tagInput.val();

				if (newToDo !== "" && tags !== "") {
					var tagsArray = tags.split(",");
					var newToDoJSON = {"description" : newToDo, "tags" : tagsArray};

					// Do a quick post to our todos route
					$.post("/todos", newToDoJSON, function (response) {
						// this callback is called with the server responds
						console.log(response);

						// Go to the 'Newest' tab
						$(".tabs a:first-child span").trigger("click");
					});

					$input.val("");
					$tagInput.val("");
				}
			});

			$content = $("<div>")
				.append($inputLabel)
				.append($input)
				.append($tagLabel)
				.append($tagInput)
				.append($button);

           	callback(null, $content);
		}
	});
	return tabs;
};

var createToDoListFromObjects = function (toDoObjectss) {
	return toDoObjectss.map(function (task) {
		return task.description;
	});
};

var organizedTaskByTagMySoln = function (toDoObjects) {
	var tagsArray = [];
	var descriptionToTagsArray = [];
	toDoObjects.forEach(function (toDo) {
		var description = toDo.description;

		toDo.tags.forEach(function (tag) {
			var descriptionToTag = new Object();
			descriptionToTag.description = description;
			descriptionToTag.tag = tag;

			tagsArray.push(tag);
			descriptionToTagsArray.push(descriptionToTag);
		});
	});

	// filter() method creates a new array with all elements 
	// that pass the test implemented by the provided function.
	var uniqueTagsArray = tagsArray.filter(function (tag, position) {
		// The indexOf() method returns the first index at which 
		// a given element can be found in the array, or -1 if it is not present.
		return tagsArray.indexOf(tag) == position;
	});

	var organizedByTagArray = [];

	uniqueTagsArray.forEach(function (tag) {
		 var tagToDesciption = new Object();
		 tagToDesciption.name = tag;
		 tagToDesciption.toDos = [];
		 descriptionToTagsArray.forEach(function (task) {
		 	if (tag == task.tag) {
		 		tagToDesciption.toDos.push(task.description);
		 	}
		 });

		 organizedByTagArray.push(tagToDesciption);
	});

	return organizedByTagArray;
};

var organizedByTagBookSoln = function (toDoObjects) {
	var uniqueTagsArray = [];
	toDoObjects.forEach(function (toDo) {

		// Iterate over each tag in this toDo
		toDo.tags.forEach(function (tag) {
			// Make sure the tag is not already in
			if (uniqueTagsArray.indexOf(tag) == -1) {
				uniqueTagsArray.push(tag);
			}
		});
	});

    // The map() method creates a new array with the results 
    // of calling a provided function on every element in this array.
	var tagObjects = uniqueTagsArray.map(function (tag) {
		// Find all the to-do objects that contain the tag
		var toDosWithTag = [];
		toDoObjects.forEach(function (toDo) {
			// check to make sure the result of indexOf is not -1
			if (toDo.tags.indexOf(tag) !== -1) {
				toDosWithTag.push(toDo.description);
			}
		});

		return { "name" : tag, "toDos" : toDosWithTag };
	});

	return tagObjects;
};