// 1. The sum of a range:
// Initial solution:
function range(start, end, step = start < end ? 1 : -1) {
    let rangeAry = [];
    if (step > 0) {
        for (let i = start; i <= end; i += step) rangeAry.push(i);
    } else {
        for (let i = start; i >= end; i += step) rangeAry.push(i);
    }
    return rangeAry;
}
function sum(rangeAry) {
    let sum = 0;
    for (let number of rangeAry) {
        sum += number;
    }
    return sum;
}
console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55

// 2. Reversing an array:
// Reverse array initial solution:
function reverseArrayOld(array) {
    newArray = [];
    for (let element of array) newArray.unshift(element);
    return newArray;
}
// using reverse iteration as in hints
function reverseArray(array) {
    let newArray = []
    for (let i = array.length - 1; i >= 0; i--) newArray.push(array[i])
    return newArray;
}

// Reverse array in place only completed with hints (but no cheating):
function reverseArrayInPlace(array) {
    let half = Math.floor(array.length / 2);
    for (i = 0; i < half; i++) {
        templow = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = templow
    }
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5, 6, 7, 8, 9];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]


// 3. A List
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

// Obviously all pointers are added from front so can just create new head of list, duh
function prependBook(value, list) {
  return {value, rest: list};
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
  if (!list) return undefined;
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

// 4. Deep Comparison
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
// Solution from book
function deepEqualBook(a, b) {
  if (a === b) return true;
  
  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object") return false;

  let keysA = Object.keys(a), keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}
  
// After going through the book step by step to understand:
function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object") return false;
  let keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length != keysB.length) return false;
  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }
  return true;
}
// Tests:
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2, extra: 3}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
console.log(deepEqual(obj, {there: {is: "an"}, object: 2}));
// → false
console.log(deepEqual(obj, null));
// → false
console.log(deepEqual(null, null));
// → true
console.log(deepEqual(3, 4));
// → false
