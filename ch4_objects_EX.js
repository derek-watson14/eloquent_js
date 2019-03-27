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

function nth(list, number) {
  let counter = 0;
  for (let node = list; node != null; node = node.rest) {
    if (counter == number) return node.value;
    else counter++;
  }
}

console.log(arrayToList([10, 20, 30]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
