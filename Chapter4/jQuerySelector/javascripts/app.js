var main = function() {
	"use-strict";

	/* Select the h2 element by its class */
	$("body .important").css("color", "red");

	/* Select the first paragraph of the relevant paragraphs */
	$("div.relevant p:first-child").css("color", "red");	

	/* Select the third paragraph of the relevant paragraphs */
	$("div.relevant p:nth-child(3)").css("color", "red");

	/* Select all of the relevant paragraphs */
	$("div.relevant p").css("color", "red");

	/* Select all of the paragraphs on the page */
	$("p").css("color", "red");

	/* Select the fifth, sixth, and seventh relevant paragraphs */
	$("p:gt(4)").css("color", "red");

	/* Selec the seventh relevant paragraph */
	$("div.relevant p:nth-last-child(1)").css("color", "red");

	/* Select the second, fourth, and sixth relevant paragraphs (0-base, so 0 is considered 1) */
	$("div.relevant p:odd").css("color", "red");

	/* Select the relevant paragraphs that are not of class a */
	$("div.relevant p:not(p.a)").css("color", "red");
};

$(document).ready(main);