/* Write a function that accepts an array of numbers as an argument and returns their average */
var avg = function(intArray) {
	var len = intArray.length;
	var result = 0;

	for (var i = 0; i < len; i++) {
		result += intArray[i];
	}

	return result / len;
};

/* Write a function that accepts an array of numbers as an argument and returns the largest number in the array */
var largestNumber = function(intArray) {
	var len = intArray.length;
	var result = 0;

	for (var i = 0; i < len; i++) {
		if (result < intArray[i]) {
			result = intArray[i];
		}
	}

	return result;
};

/* Write a function that accepts an array of numbers and returns true if it contains at least one event number, false otherwise */
var atLeastOneEvenNumber = function(intArray) {
	var len = intArray.length;

	for (var i = 0; i < len; i++) {
		if ((intArray[i] % 2) === 0) {
			return true;
		}
	}

	return false;
};

/* Write a function that accepts an array of numbers and returns true if every number is even, false otherwise */
var allEvenNumber = function(intArray) {
	var len = intArray.length;

	for (var i = 0; i < len; i++) {
		if ((intArray[i] % 2) > 0) {
			return false;
		}
	}

	return true;
};

/* Write a function that accepts an array of string and a string, returns true if the string is contained in the array, false otherwise */
var arrayContains = function(stringArray, string) {
	var len = stringArray.length;

	for (var i = 0; i < len; i++) {
		if (stringArray[i] === string) {
			return true;
		}
	}

	return false;
};

/* Write a function that accepts an array of string and a string. Returns true only if the array contains the given string at least twice */
var arrayContainsTwo = function(stringArray, string) {
	var len = stringArray.length;
	var numberOfSameString = 0;

	for (var i = 0; i < len; i++) {
		if (stringArray[i] === string) {
			++numberOfSameString;
		}

		if (numberOfSameString === 2) {
			return true;
		}
	}

	return false;
};

var arrayContainsNTimes = function(stringArray, string, expectedNumOfTimes) {
	var len = stringArray.length;
	var numberOfSameString = 0;

	for (var i = 0; i < len; i++) {
		if (stringArray[i] === string) {
			++numberOfSameString;
		}

		if (numberOfSameString === expectedNumOfTimes) {
			return true;
		}
	}

	return false;
};