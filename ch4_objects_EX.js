// A List
function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
  	list = {value: array[i], rest: list}
  }
  return list;
}

function listToArray(list) {
  let array = [];
  for (let node = list; node != null; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

function prepend(element, list) {
  let array = [element];
  for (let node = list; node != null; node = node.rest) {
    array.push(node.value);
  }
  let newList = null;
  for (let i = array.length - 1; i >= 0; i--) {
  	newList = {value: array[i], rest: newList}
  }
  return newList;
}

// Non Recursive version
function nthOld(list, index) {
  let counter = 0;
  for (let node = list; node != null; node = node.rest) {
    if (counter == index) return node.value;
    else counter++;
  }
}

// Recursive version
function nth(list, index) {
  if (index == 0) return list.value;
  else return nth(list.rest, index - 1);
}

console.log(arrayToList([10, 20, 30]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20

// Deep Comparison
// Initial solution:
function deepEqual(valA, valB) {
  if (valA === valB) return true;
  else if (valA == null && valB != null || valB == null && valA != null) return false;
  else if (typeof valA == "object" && typeof valB == "object") {
    let keysA = Object.keys(valA);
    let keysB = Object.keys(valB);
    for (let i = 0; i < keysA.length; i++) {
      return deepEqual(valA[keysA[i]], valB[keysB[i]]);
    }
  }
  else return false;
}

// Solution that actually checks everything, using hints:
function deepEqual(valA, valB) {
function deepEqual(valA, valB) {
  	if (typeof valA != typeof valB) {
        return false;
    } else if (typeof valA != "object" || valA == null || valB == null) {
    	if (valA !== valB) return false;
    } else {
    	let keysA = Object.keys(valA);
    	let keysB = Object.keys(valB);
      	if (keysA.length != keysB.length) return false;
    	for (let i = 0; i < keysA.length; i++) {
      		if (keysA[i] != keysB[i]) return false;
          	return deepEqual(valA[keysA[i]], valB[keysB[i]]);
      }
    }
  	return true;
}

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
console.log(deepEqual(obj, null));
// → false

