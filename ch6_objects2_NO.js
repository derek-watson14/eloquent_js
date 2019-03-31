// Chapter 6: The Secret Life of Objects
// Methods, Classes, Getters and Setters, Inheritance, etc.


// METHODS:
// Simple Method
let rabbit = {};
rabbit.speak = function(line) {
    console.log(`The rabbit says "${line}"`)
}

// The 'this' binding refers to the specified property of *this* instance of the object
function speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};
hungryRabbit.speak("Can I have a carrot?")

// This can be passed eplicitly with function's call method
// call takes "this" as first parameter
speak.call(hungryRabbit, "Yum!")

// Arrow functions see the this binding of the scope around them,
// But do not have their own this binding
function normalize() {
    console.log(this.coords.map(n => n / this.length));
  } // Both normalize and its inside funtions can access object props
  // Had function and not => syntax been used this wouldnt have worked
  normalize.call({coords: [0, 2, 3], length: 5});
  // → [ 0, 0.4, 0.6 ]

// When objects do not have a requested property their search their prototype
// Prototypes are like ancestors, and the OG prototype is Object.prototype
// When a function is not found in an object, it's prototypes are searched
console.log(Object.getPrototypeOf({}) == Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null

// Object.create can be used to create an object with a speficic prototype
let protoRabbit = {
    // Shorthand way to define method
    // Creates property called speak and gives function as value
    speak(line) {
      console.log(`The ${this.type} rabbit says '${line}'`);
    }
  };
let newRabbit = Object.create(protoRabbit);
newRabbit.speak(); // → The undefined rabbit says 'undefined'
newRabbit.type = "killer";
newRabbit.speak("SKREEEE!"); // → The killer rabbit says 'SKREEEE!'

// CLASSES:
// Prototype is like an informal take on classes in OOP
// Class defines the shape of a type of object (methods and properties)
// An individual object is an instance of the class (prototype)
// Prototypes define what instances of the class will share (like certain methods)

// A 'constructor' assures that an instance contains all required class properties:
function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
  }
// Putting the word 'new'in front of a function call tells JS the following is a constructor
// The following is a very fragmented way to declare a class, a better method comes later 
function Rabbit(type) { // Even the editor recognizes the wierd syntax
    this.type = type;
}
Rabbit.prototype.speak = function(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
};
Rabbit.prototype.hello = function() {
    console.log("Hello");
    
}
let weirdRabbit = new Rabbit("weird");
weirdRabbit.speak("oOoOo mama");
weirdRabbit.hello();
// All fuctions automatically get a property names prototype, holding an empty object
// You can overwrite it with a new object, or add properties to exsisting object
// Convention says to capitalize constructor functions

/* 
It is important to understand the distinction between the way a prototype is associated with a constructor (through its prototype property),
and the way objects have a prototype (which can be found with Object.getPrototypeOf). 
The actual prototype of a constructor is Function.prototype since constructors are functions. 
Its prototype property holds the prototype used for instances created through it.
*/
console.log(Object.getPrototypeOf(Rabbit) == Function.prototype);
// → true
console.log(Object.getPrototypeOf(weirdRabbit) == Rabbit.prototype);
// → true

// Modern ES6 class notation:
class RabbitES6 {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}
let killaRabbit = new RabbitES6("killa");
let blackRabbit = new RabbitES6("black");
// Allows us to define a constructor and a set of methods in one place
// Constructor is a special name, like __init__ in python, and is needed to construct the instance

// Classes can also be used in an 'expression' rather than a statement
// They must not be named, no binding is produced just gives constructed contents as a value
let expression = new class {constructor(namen) {this.namen = namen;}; getWord() { return "hello"; } };
expression.namen = "DJW";
console.log(expression.getWord(), expression.namen);
// → hello

// If an object and its prototype have the same properties (by name), the object "overrides" its prototype
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small

// Overriding is useful to differentiate objects with exceptional features from their standard prototypes
// Here the Array object overrides toString() in the grandaddy prototype Object object
console.log(Array.prototype.toString == Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2 <- like .join(", ")
console.log(Object.prototype.toString.call([1, 2]));
// → [object Array] <- Object + name of type

