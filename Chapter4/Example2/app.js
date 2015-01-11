var main = function() {
	"use-strict";

	$(".comment-input button").on("click", function(event) {
		var comment_text = $(".comment-input input").val();

		// Ensure that comment_text is not empty
		if (comment_text !== "") {
			// Add a $ to the var name if it holds a jQuery object
			// jQuery allows for chaining function calls
			var $new_comment = $("<p>");
			$new_comment.text(comment_text);
			$(".comments").append($new_comment);
		}
	});
};

$(document).ready(main);