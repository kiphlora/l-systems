function sum(arr) {
	var s = 0;
	for (var i=0; i<arr.length; i++) {
		s += arr[i];
	}
	return s;
}

function vecOp(arr, f) {
	var a = [];
	for (var i=0; i<arr.length; i++) {
		a[i] = f(arr[i], i);
	}
	return a;
}

function areArraysEqual(arr1, arr2) {
	if (arr1.length !== arr2.length) return false;
	for (var i=0; i<arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
}

function buildArray(len, initVal) {
	var a = [];
	for (var i=0; i<len; i++) {
		a[i] = initVal;
	}
	return a;
}

function buildCustomArray(len, f) {
	var a = [];
	for (var i=0; i<len; i++) {
		a[i] = f(i);
	}
	return a;
}

// returns form: [index in array of max value, max value]
function max(arr) {
	var m = [0, arr[0]];
	for (var i=0; i<arr.length; i++) {
		m = m[1] >= arr[i] ? m : [i, arr[i]];
	}
	return m;
}

// returns form: [index in array of min value, min value]
function min(arr) {
	var m = [0, arr[0]];
	for (var i=0; i<arr.length; i++) {
		m = m[1] <= arr[i] ? m : [i, arr[i]];
	}
	return m;
}