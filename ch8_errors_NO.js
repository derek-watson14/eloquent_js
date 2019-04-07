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
// Tests usually take the form of little labeled programs that verify some aspect of your code.
// Sample tests for the toUpperCase method:
function test(label, body) {
  if (!body()) console.log(`Failed: ${label}`);
}

test("convert Latin text to uppercase", () => {
  return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to uppercase", () => {
  return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});
test("don't convert case-less characters", () => {
  return "مرحبا".toUpperCase() == "مرحبا";
});
// This is a fairly repetitive and busy way to write tests, but
// software called Test Suites exsist to make the process easier by providing prebuilt functions and methods
// This software outputs information when the test fails: called test runners
// The more the code interacts with other objects and the less persistent the data is the harder it is to test

// Debugging:
// Resist the urge to immediately start changing things at random
// Stop, thing about the problem and develop the theory, test the theory, then change the code
// https://developers.google.com/web/tools/chrome-devtools/javascript/
// Chrome also provides a debugger that can be used in browser
// It is found in the sources tab of the developer tools
// Simply open a file and operate the website. See link above for more information

// Error propogation:
// It is best when the program actively does something in response to an error: not jsut crash
// Sometimes its better to report and close, sometimes better to retrun a special value and keep running
// Returning a special value (ex. null, undefined, -1) is best when the error is common and,
//  the direct caller can take the special value into account and handle them
// The downsides are if the function can take any vlaue and thus there is no "special value" availible 
// Also the special value may have to be messily passed through the call stack

// Exceptions & Exception Handling: 
// Exceptions are a mechanism that allows code that  hs a problem to raise or throw an exception
// The thrown exception will zoom down the call stack until it is "caught" by some caller
// Example: 
function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  // Error is an object which takes a message as a constructor parameter
  // Also will provide a so-called stack trace
  throw new Error("Invalid direction: " + result);
}
function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}
// the program "tries" to call Console.log whic calls look, which calls promt direction
// if promptDirection raises an error, the try statement will catch it and print a message
try {
  console.log("You see", look());
} catch (error) {
  console.log("Something went wrong: " + error);
}

// The throw keyword is used to raise an exeption, it is caught by using a try/catch/finally statement
// When code in the try block causes an exception to be raised, the catch block is evaluated
// When the try/catch is done the program continues

// Cleaning up after exceptions:
// If a fucntion has side effects, and an expeption is raised, the control flow will immediately leave the function with the exception
// In that case, any side effects that were half-complete will never be completed, changing other parts of the program unpredictably
// Example:
const accounts = {
  a: 100,
  b: 0,
  c: 20
};
function getAccount() {
  let accountName = prompt("Enter an account name");
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}
function transfer(from, amount) {
  if (accounts[from] < amount) return;
  accounts[from] -= amount;
  // getAccount is called here, after the money is withdrawn, but before the money is deposited
  // if getAccount raises an exception, the money dissappears
  accounts[getAccount()] += amount;
}

// One way to address this is to use fewer side effects (compute new values not change exsisting ones)
// If the code bails the half made new value is simply thrown away

// The "finally" block is another way to solve this problem (can be added with or without a catch as part of a try)
// The code in the finally block runs regardless of what happens in the try/catch
// Example: 
function transfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    // If the money isn't deposited, the money is put back in the first account
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}

// Selective Exception Catching
// For programmer mistakes, letting an error reach the bottom of the stack (the enviromnemt),
// is a good way to signal a broken program
// But for expected exceptions, crashing is a terrible strategy
// There is not way to selectively catch exceptions, 
// all will be caught and its up to the catch block to choose what to do 
// Blanket catching exceptions is a bad idea unless they are routed somewhere to be sorted

// One can use the class inheritence syntax of JS to define certain types of errors:
// Example:
// This takes all the properties of Error, but under a specifc name that can be recognized
class InputError extends Error {}
function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new InputError("Invalid direction: " + result);
}
for (;;) {
  try {
    let dir = promptDirection("Where?");
    console.log("You chose ", dir);
    break;
  } catch (e) {
    // This section of the catch block checks the type of error
    if (e instanceof InputError) {
      console.log("Not a valid direction. Try again.");
    } else {
      throw e;
    }
  }
}
// Assertions:
// Assertions are checks inside a program that verify that something is the way it is supposed to be.
// They are not used to handle operator errors but to find programmer mistakes
// Example:
function firstElement(array) {
  // This for example will notify the programmer when s/he passes in an empty array
  if (array.length == 0) {
    throw new Error("firstElement called with []");
  }
  return array[0];
}
// Writing assertions for all bad input will result in a lot of work and noisy code
// Reserve assertions for common mistakes or ones that are easy to make