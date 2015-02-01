var main = function (toDoObjectss) {
	"use strict";

	var toDos = toDoObjectss.map(function (task) {
		return task.description;
	});

	// jQuery allows us to select a set of elements and then iterate over it as an array
	$(".tabs a span").toArray().forEach(function (element) {
		// Create a click handler for this element
		$(element).on("click", function () {
			// since we're using the jQuery version of element,
			// we'll go ahead and create a temporary variable
			// so we don't need to keep recreating it
			var $element = $(element);
			var $content;

			// make all the tabs inactive
			$(".tabs span").removeClass("active");

			$element.addClass("active");

			// empty the main content so we can recreate it
			$("main .content").empty();

			if ($element.parent().is(":nth-child(1)")) {
				// Newest
				$content = $("<ul>");

				toDos.forEach(function (todo) {
                	$content.prepend($("<li>").text(todo));
            	});

			} else if ($element.parent().is(":nth-child(2)")) {				
				// Oldest
				$content = $("<ul>");

				toDos.forEach(function (todo) {
                	$content.append($("<li>").text(todo));
            	});

			} else if ($element.parent().is(":nth-child(3)")) {
				// Tags
				var organizedByTag = organizedByTagBookSoln(toDoObjectss);

				organizedByTag.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name);
					var $content = $("<ul>");

					tag.toDos.forEach(function (desciption) {
						var $li = $("<li>").text(desciption);
						$content.append($li);
					});

					$("main .content").append($tagName);
					$("main .content").append($content);
				});

			} else if ($element.parent().is(":nth-child(4)")) {
				// Add
				var $button = $("<button>").text("+");
				var $input = $("<input>");

				$button.on("click", function () {
					var newToDo = $input.val();
					console.log(newToDo);
					if (newToDo !== "") {
						toDos.push(newToDo);
						$input.val("");
					}
				});

				$content = $("<div>").append($input).append($button);
				/* Alternatively append() allows multiple arguments so the above
                can be done with $content = $("<div>").append($input, $button); */
			}

			$("main .content").append($content);

			// return false so the browser don't follow the link
			return false;
		});
	});

	$(".tabs a:first-child span").trigger("click");
};

$(document).ready(function () {
	var toDoObjects = [
		{
			"description" : "Get groceries",
			"tags" : ["shopping", "chores"]
		},
		{
			"description" : "Make up some new ToDos",
			"tags" : ["writing", "work"]
		},
		{
			"description" : "Prep for Monday's class",
			"tags" : ["work", "teaching"]
		},
		{
			"description" : "Answer emails",
			"tags" : ["work"]
		},
		{
			"description" : "Take Gracie to the park",
			"tags" : ["chores", "pets"]
		},
		{
			"description" : "Finish writing this book",
			"tags" : ["writing", "work"]
		}
	];

	main(toDoObjects);
	
	// Need to be able to read local files from the webpage to do the below
	// $.getJSON("todo.json", function (toDoObjects) {
	// 	main(toDoObjects);
	// });
});

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
	var tagOjects = uniqueTagsArray.map(function (tag) {
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

	return tagOjects;
};