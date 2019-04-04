// Strict Mode
// Makes the interpretor slightly more strict, example below:
function canYouSpotTheProblem() {
    "use strict";
    for (counter = 0; counter < 10; counter++) {
      console.log("Happy happy");
    }
}

canYouSpotTheProblem();
// → ReferenceError: counter is not defined
// ie. no let in the for loop
// Regularly, that would not cause a problem. In strict mode you get an error message
// You can also not accidently use "this" outside the context of a class/method in strict mode without an error

// Here, this constructor function is used as a function, not as a constructor method (ie. no new keyword is used)
// In normal mode a global binding name is created and ferdinand iteself is undefined
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // oops
console.log(name);
// → Ferdinand
console.log(ferdinand);
// → undefined

// In strict mode this produces an error, which is helpful
"use strict";
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // forgot new
// → TypeError: Cannot set property 'name' of undefined

// When using ES6 class notation, failing to use new will always produce an error, strict or not
// Strict mode has further benefits not discussed
// Adding it to the top of a program will rarely hurt your program and can help with debugging

// Types
// js is not fussy about types and even does type conversions
// So issues with type crop up frequently when not catious
// Commenting source and types above functions can aleviate some issues 

// (VillageState, Array) → {direction: string, memory: Array}
function goalOrientedRobot(state, memory) {
    // ...
}
// This unfortunately brings its own problems, 
// because some parts of a program can produce multiple types under the same binding or output
// Typescript is JavaScript with types and likely makes for easier debugging at the "expense" of more careful programming

// Testing