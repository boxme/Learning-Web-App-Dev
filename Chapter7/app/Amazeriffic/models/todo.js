var mongoose = require("mongoose");

// This is our mongoose model for todos
var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [String]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;