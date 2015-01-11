var main = function() {
	"use-strict";

	$(".comment-input button").on("click", function(event) {
		// Add a $ to the var name if it holds a jQuery object
		// jQuery allows for chaining function calls
		var $new_comment = $("<p>");
		var comment_text = $(".comment-input input").val();

		$new_comment.text(comment_text);

		$(".comments").append($new_comment);
	});
};

$(document).ready(main);