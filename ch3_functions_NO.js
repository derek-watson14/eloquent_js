// Defining a variable to hold a function as a value
const f = function(a) {
    console.log(a + 2);
  };
f(1) 
// -> 3

// Declaring a function: 
function g(a, b) {
    return a * b * 3.5;
  }
console.log(g(1, 1))
// -> 3.5

// Less verbose way of assigning function value to variable
let h = a => a % 3;
console.log(h(3));
// -> 0

// Note of function scope:
// Variables declared within functions cannot be accessed outside their function, 
// but variables declared in higher scope can be used within lower functions

var scope = 5;
let scopeTwo = 5;
const scopeThree = 5;
function i(c) {
    console.log(c + scope + scopeTwo + scopeThree);
    let scopeFoura = "scopeFoura";
    var scopeFourb = "scopeFourb";
    console.log(scopeFive);
    console.log(scopeSix); 
    console.log(scopeSeven);
}
var scopeFive = "scopeFive";
let scopeSix = "scopeSix";
const scopeSeven = "scopeSeven";
i(5)
// -> 20

// console.log(scopeFoura);  <- Will not run because scope of scopeFour is within function
// console.log(scopeFourb);  <- Still will not print as const or var
