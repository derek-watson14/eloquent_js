// Example function from summarizing with reduce section
// Added extra printing for clarity of operation
function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    // console.log(`${count}, ${script.name}`);
    return count + (to - from);
  }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
  console.log(a, b);
  return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}

// Finsing average age of living vs dead langauges:
// Builds an array wit reduce built in, divides it by length of array for average
function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

// Create with map an array of all year values, filtered only for living languages,
// then pass that array into average and print the result, which represents the average date of creation
console.log(Math.round(average(
  SCRIPTS.filter(s => s.living).map(s => s.year))));
// → 1188
// Do the same for not living languages
console.log(Math.round(average(
  SCRIPTS.filter(s => !s.living).map(s => s.year))));
// → 188

//Do the same with directional properties RTL, LTR, TTB
function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

console.log(Math.round(average(  
  SCRIPTS.filter(s => s.direction == "ltr").map(s => s.year))));
// → 900
console.log(Math.round(average(  
  SCRIPTS.filter(s => s.direction == "rtl").map(s => s.year))));
// → 232
console.log(Math.round(average(  
  SCRIPTS.filter(s => s.direction == "ttb").map(s => s.year))));
// → 1482

//Or list oldest and youngest languages
console.log(SCRIPTS.filter(s => s.year > 1970).map(s => [s.year, s.name]));
// → [[1987, "Adlam"], [1985, "Mro"], [2006, "Osage"], [1974, "SignWriting"]]

console.log(SCRIPTS.filter(s => s.year < -2000).map(s => [s.year, s.name]));
// → [[-3200, "Egyptian Hieroglyphs"], [-2500, "Linear A"], [-3050, "Cuneiform"]]

// Can use for loop to go over a strings chars,
// Noe matter if chars take up one or two UTF-16 code units
let roseDragon = "🌹🐉";
for (let char of roseDragon) {
  console.log(char);
}
// → 🌹
// → 🐉

// Count by funtion:
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    // Produces a group name using function specified in 
    let name = groupName(item);
    // If name produced by group name function already exsists,
    // return either its position in the array else -1 to indicate its new
    let known = counts.findIndex(c => c.name == name); 
    console.log(item, name, known);
    if (known == -1) { // ie if not encountered before, create new group
      counts.push({name, count: 1});
    } else { // if encountered before, tally
      counts[known].count++;
    }
  }
  return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]

// Experimental version of same program creating different group names
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    // Produces a group name using function specified in 
    let name = groupName(item);
    // If name produced by group name function already exsists,
    // return either its position in the array else -1 to indicate its new
    let known = counts.findIndex(c => c.name == name); 
    if (known == -1) { // ie if not encountered before, create new group
      counts.push({name, count: 1});
    } else { // if encountered before, tally
      counts[known].count++;
    }
  }
  return counts;
}
function toLetter(number) {
  if (number <= 2) return "Less than two";
  else if (3 <= number && number <= 4) return "Three or four";
  else if (number >= 5) return "Five or above";
}

console.log(countBy([1, 2, 3, 4, 5, 6, 7], n => toLetter(n)));
// → list containing three objects with names produced by toLetter and count 

// Or, without using an extra function
console.log(countBy([1, 2, 3, 4, 5, 6, 7], number => {
  if (number <= 2) return "Less than two";
  else if (3 <= number && number <= 4) return "Three or four";
  else if (number >= 5) return "Five or above";
}));

// Final example bringing everything together in chapter:
function textScripts(text) {
  // Using function specified, checks each char for its script,
  // then returns the script and count as an object with name and count props
  // Filters all where name == none
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({name}) => name != "none");
  
  // Count total chars in text with reduce
  let totalChars = scripts.reduce((n, {count}) => n + count, 0);
  console.log(totalChars);
  if (totalChars == 0) return "No scripts found";
  
  // Use .map on the array returned by scripts to print a formatted string
  // for each item, using Math and totalChars to print a percentage
  return scripts.map(({name, count}) => {
    console.log(scripts);
    return `${Math.round(count * 100 / totalChars)}% ${name}`;
  }).join(", ");
}

console.log(textScripts('英国的狗说"woof",Üöäß 俄罗斯的狗说"тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic

// Array builtin higher-order methods summary:
// forEach: loops over elements in array
// filter: returns new array containing only elements that pass predicate function
// map: transforms array by putting each element through a function
// reduce: use function to combine all elements in array into single value
// some: tests if an element matches a predicate function
// findIndex: finds the position of the first element that matches a predicate

