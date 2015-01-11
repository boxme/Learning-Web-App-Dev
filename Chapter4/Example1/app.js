// A global function called main, which is the entry point 
// for the execution of the program
var main = function() {
	// Set up to run in strict mode, which disallows certain bad aspects
	// of Javascript that have caused problems for programmers in the past.
	"use-strict";

	window.alert("hello world");
};

// Uses jQuery to set up the execution of the main function 
// once the HTML docurment is fully loaded and ready
$(document).ready(main);