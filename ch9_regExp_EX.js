// https://regex101.com/

// 1. Regexp golf:
// Write a regular expression to test whether any of the given substrings occur in a string

// car and cat
verify(/ca[rt]/,
    ["my car", "bad cats"],
    ["camper", "high art"]);

// pop and prop
verify(/pr?op/,
    ["pop culture", "mad props"],
    ["plop", "prrrop"]);

// ferret, ferry, and ferrari
verify(/ferr(et|y|ari)/,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

// Any word ending in ious
verify(/ious\b/,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

// A whitespace character followed by a period, comma, colon, or semicolon
verify(/\s[.,;:]/,
    ["bad punctuation ."],
    ["escape the period"]);

// A word longer than six letters
verify(/\w{7}/,
    ["hottentottententen"],
    ["no", "hotten totten tenten"]);

// A word without the letter e (or E)

// So long as the string contains 1+ word characters and no E or e, surrounded by work breaks
// Because without the \W, it will match for the space between the words because they dont contain an e
// \b matches the position between a word character followed by a non-word character 
// OR between a non-word character followed by a word character
verify(/\b[^\We]+\b/i,
    ["red platypus", "wobbling nest"],
    ["earth bed", "learning ape", "BEET"]);

function verify(regexp, yes, no) {
    // Ignore unfinished exercises
    if (regexp.source == "...") return;
    for (let str of yes) if (!regexp.test(str)) {
        console.log(`Failure to match '${str}'`);
    }
    for (let str of no) if (regexp.test(str)) {
        console.log(`Unexpected match for '${str}'`);
    }
}

// 2. Quoting Style:

let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
// Checks for ' at beginning of line, ' after a non-word char, 
// ' before a non-word char and ' at end of line
// Uses $1 & $2 to reinsert parts of expression 

// My solution:
console.log(text.replace(/^\'|(\W)'|'(\W)|\'$/g, '$1"$2'));
// → "I'm the cook," he said, "it's my job."
// Book solution:
console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));

// 3. Numbers Again:

// Match only JavaScript style numbers:
// +/- optional in front, a decimal dot if needed, 
// exponent notation with - after the e or E optional
// A lone . is not a js number but having a number on either side is

// Fill in this regular expression.
// My solution:
let numberXX = /^(\+|-)?((\d+\.)|(\.\d+)|(\d*)|(\d+?\.\d+?))(e(\+|-)?\d+)?$/i;
// Book solution
let numberBook = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;
// Combo
let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)(e[+\-]?\d+)?$/i;

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
                 "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
                 ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}