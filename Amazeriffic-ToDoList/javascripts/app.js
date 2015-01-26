var main = function() {
	"use-strict";

	var toDos = [
		"Finish writing this book", 
		"Take Gracie to the park", 
		"Answer emails",
		"Prep for Monday's class",
		"Make up some new ToDos",
		"Get Groceries"
	];

	// jQuery allows us to select a set of elements and then iterate over it as an array
	$(".tabs a span").toArray().forEach(function (element) {
		// Create a click handler for this element
		$(element).on("click", function() {
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
				$content = $("<ul>");

				toDos.forEach(function (todo) {
                	$content.prepend($("<li>").text(todo));
            	});

			} else if ($element.parent().is(":nth-child(2)")) {				
				$content = $("<ul>");

				toDos.forEach(function (todo) {
                	$content.append($("<li>").text(todo));
            	});

			} else if ($element.parent().is(":nth-child(3)")) {
				var $button = $("<button>").text("+");
				var $input = $("<input>");

				$button.on("click", function() {
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

$(document).ready(main);