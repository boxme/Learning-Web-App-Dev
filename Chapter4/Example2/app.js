var main = function() {
	"use-strict";

	// Declare the function
	var addCommentFromInputBox = function() {
		var comment_text = $(".comment-input input").val();

		// Ensure that comment_text is not empty
		if (comment_text !== "") {
			// Add a $ to the var name if it holds a jQuery object
			// jQuery allows for chaining function calls
			var $new_comment = $("<p>");
			$new_comment.text(comment_text);

			// Hide the new comment first
			$new_comment.hide();

			$(".comments").append($new_comment);

			// Fade in the new comment after the append
			$new_comment.fadeIn();

			// The val method of the jQuery object with an explicit val
			// it will be filled with that value
			$(".comment-input input").val("");
		}
	};

	$(".comment-input button").on("click", function(event) {
		addCommentFromInputBox();
	});

	$(".comment-input input").on("keypress", function(event) {
		// 'Enter' key is pressed
		if (event.keyCode === 13) {
			// Click the button programmatically
			$(".comment-input button").trigger("click");
		}
	});
};

$(document).ready(main);