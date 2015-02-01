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
				var organizedByTag = [
					{
						"name" : "shopping",
						"toDos" : ["Get groceries"]
					},
					{
						"name" : "chores",
						"toDos" : ["Get groceries", "Take Gracies to the park"]
					}, 
					{
						"name" : "writing",
						"toDos" : ["Make up some new ToDos", "Finish writing this book"]
					},
					{
						"name" : "work",
						"toDos" : ["Make up some new ToDos", "Prep for Monday's class", "Answer emails", "Finish writing this book"]
					}, 
					{
						"name" : "teaching",
						"toDos" : ["Prep for Monday's class"]
					}, 
					{
						"name" : "pets",
						"toDos" : ["Take Gracie to the park"]
					}
				];
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