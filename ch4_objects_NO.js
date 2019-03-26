// Array declaration
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
// → 5

// Object declatation: (properties seperated by commas)
let objector = {a: 1, b: 2};
let day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running"]
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false; // Adds property to object
console.log(day1.wolf);
// → false
console.log(day1.keys); // Returns array of object property names
// "in" binary operator can test if property is member of object

// .assign copies properties from one object to another
let objectA = {a: 1, b: 2};
let objectB = {a: 5, b: 6, c: 7};
Object.assign(objectA, objectB);
console.log(objectA);
// → {a: 5, b: 6, c: 7}

// It's possible to make both arrays of objects and objects fll of arrys

// Objeccts are a mutable datatype, meaning one object can have diffferent content at different times
let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};
console.log(object1 == object2);
// → true
console.log(object1 == object3);
// → false
object1.value = 15;
console.log(object2.value);
// → 15
console.log(object3.value);
// → 10

// Above, ob1 & 2 have same 'identity', ob3 has same content but is at a different memory location
// You can use a let binding to keep track of a changing number by changing the value the binding points at
// Const bindings cannot be pointed to different memory locations, but if it points to an object,
//  the objects contents can be changed (this wouldn't work with strs and ints because they are immutable)
// The comparison operator == compares identity (~memory location), so two object will never evaluate as equal

// To compute the measure of correlation between two Boolean variables, we can use the phi coefficient (ϕ)
// Translated into js, with 2 digit binary number:
// Significant digit (2s place , left) represents squirrel or no squirrel
// Least significant digit (1s place, right) represents event variable (t/f also)
// 00 = no sq, no ev; 01 = no sq, ev; 10 = sq, no ev; 11 = sq, ev
// 00 = table[0], 01 = table[1], 10 = table[2], 11 = table[3]
// With data as int for each index, coorelation can be calculated:

function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *   //sqrt == square root
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}
console.log(phi([76, 9, 4, 1]));
// → 0.068599434

// Function that creates a 2x2 table from above for a given entry in completed journal
function tableFor(event, journal) {
  let table = [0, 0, 0, 0]; // All indexed init to 0
  for (let i = 0; i < journal.length; i++) {  
    let entry = journal[i], index = 0; // Loop over whole journal
    // Calculate proper index for this entry
    if (entry.events.includes(event)) index += 1; // If event, index +1
    if (entry.squirrel) index += 2; // If squirrel, index + 2
    table[index] += 1; // Increment the count for this index
  }
  return table;
}
console.log(tableFor("pizza", JOURNAL));
// → [76, 9, 4, 1]

// Modern javascript way to loop over an array:

for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events.`);
}

// Another example, similar to python, but must give var "type"
let vals = ["derek", "tim", "anni"];
for (let name of vals) {
  console.log(`"${name}" is ${name.length} characters.`);
}

