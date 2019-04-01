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
function Rabbit(type) { // Even the editor recognizes the wierd syntax, note Rabbit is capitalized as constructor
    this.type = type;
}
// The constructor is Rabbit, its prototype property contains its methods
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
// console.log(killerRabbit.teeth);
// → small
//killerRabbit.teeth = "long, sharp, and bloody";
//console.log(killerRabbit.teeth);
// → long, sharp, and bloody
//console.log(blackRabbit.teeth);
// → small
//console.log(Rabbit.prototype.teeth);
// → small

// Overriding is useful to differentiate objects with exceptional features from their standard prototypes
// Here the Array object overrides toString() in the grandaddy prototype Object object
console.log(Array.prototype.toString == Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2 <- like .join(", ")
console.log(Object.prototype.toString.call([1, 2]));
// → [object Array] <- Object + name of type

// MAPS:
// A map is a data structure that defines key-value pairs
let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62
};
console.log(`Júlia is ${ages["Júlia"]}`);
// → Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages);
// → Is toString's age known? true 
// Last is an example of prototype methods being present in all objects
// Because of this its dangerous to use plain objects as maps
// Can create object without prototype to avoid this:
let nullOb = Object.create(null);
nullOb.Boris = 39;
console.log("toString" in nullOb, nullOb.Boris);
// → false

// JS actually has a class called map better suited for this purpose
let agesMap = new Map();
agesMap.set("Boris", 39);
agesMap.set("Liang", 22);
agesMap.set("Júlia", 62);

console.log(`Júlia is ${agesMap.get("Júlia")}`);
// → Júlia is 62
console.log("Is Jack's age known?", agesMap.has("Jack"));
// → Is Jack's age known? false
console.log(agesMap.has("toString"));
// → false
// "Get", "set" and "has" are part of interface of Map object
// Object.keys does not return prototype keys, so can help to treat object as a map
// Also "hasOwnProperty" is an "in" alternative that ignores proto properties

// Polymorphism:
// You can pass functions (and other values) into prototype functions 
// In order to modify them, for example the toString (=String()) is modified 
// to print specific data from the instance
Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};
console.log(String(blackRabbit));
// → a black rabbit
// This is object polymorphism
// A for/of loop is another example of polymorphism
// Expects a specific interface when used, arrays and strings provide that

// Property names can be made to be symbols rather than strings:
// Symbols are created with the Symbol() function and are unique, you cannot have 
// two of the same symbols in the same program
// They can share the same name but are located at different memory locations
// Thus they will evaluate differently
// USe square bracket notation to access symbols

const toString = Symbol("toString");
Array.prototype[toString] = function() {
  return `${this.length} cm of blue yarn`;
};
console.log([1, 2].toString());
// → 1,2
console.log([1, 2][toString]());
// → 2 cm of blue yarn

// Symbols can be used as properties in object expressions
let stringObject = {
  [toString]() { return "a jute rope"; }
};
console.log(stringObject[toString]());
// → a jute rope

// Object given to for/of loop needs to be an interable
// Iterable objects will have Symbol.iterator symbol as a property
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}
// next, value, and done are strings, not symbols

// Matrix example as iterator
class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }
  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}
class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }
  next() {
    if (this.y == this.matrix.height) return {done: true};
    let value = {x: this.x,
                 y: this.y,
                 value: this.matrix.get(this.x, this.y)};
    this.x++;
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return {value, done: false};
  }
}
Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
};
let matrix = new Matrix(5, 2, (x, y) => `location ${x},${y}`);
for (let {value} of matrix) {
  console.log(value);
}
// When the class is constructed, the (x,y) function is used to build third property's value
// It builds the values in a grid pattern with nested for loops contingent on first 2 properties
// It then alters its [Symbol.iterator] by pointing to an iterator class
// That class inherits the values of matrix and adds its own x & y (which are trackers)
// It then defines its behavior upon iteration by overwriting the next() property of Symbol.iterator
// It works in a grid pattern through the matrix, with each next returning an object "value" and a done status
// Within object "value" is x, y, and value
// "value.value" comes from the get method of Matrix, 
// which in turn retrives a value from the array at the position set by the constructor,
// which is originally set by the "element" function passed optionally on construction
// When this class is passed into the for/of iterator, it can now return multiple values as expected

// Getters & Setters:
// Even properties accessed directly with .<prop> notation may be hiding a method
// Getters can be defined with the "get" keyword
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
};
console.log(varyingSize.size);
// → 73
console.log(varyingSize.size);
// → 49
// Setters do the opposite, performing an action on some of the classes properties when they are called
// As expected, the keyword set is used in this situation:
class Temperature {
  constructor(celsius) {
    this.celsius = celsius; // Initial temp in C
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32; // Function when .farenheit is called
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8; // Function when .farenehit is "set" (just changes C)
  }
  // Static methods are stored in class's constructor, not in its prototype property
  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}
let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30
// With above can one read or write both temperature forms, but only Celcius is actually stored in memory
// Automatic conversions are made to read and write farenheit
// Inside a class declaration, methods that have static written before their name are stored on the constructor.
// These can be used as additional ways to costruct instances
// In this example, fromFahenheit() allows for creation of anobject from farenheit
let fahrTemp = Temperature.fromFahrenheit(100);
console.log(fahrTemp.celsius);
// → 37.777...

// Inheritance:
// The "extends" keyword is used to inherit some properties from a prototype and then alter them
// In this cse the prototype is not Object.prototype, but Matrix, from above
// Maxrix is the Superclass, SymmetricMatrix is the subclass
// In this example, all properties and methods are inherited from Matrix
// But, some are changed to make it different (the number of constructor arguments and how they are handled, mainly)
// This ensures the matrix is square and thus symetrical 
class SymmetricMatrix extends Matrix { // Defines superclass with extends
  constructor(size, element = (x, y) => undefined) {
    super(size, size, (x, y) => { // Calls superclass' constructor with super, passing necessary args
      if (x < y) return element(y, x); // Passes in values created by function to super's content array
      else return element(x, y);
    });
  }
  set(x, y, value) {
    super.set(x, y, value); // Super here calls a specific method, redefining it below
    if (x != y) {
      super.set(y, x, value);
    }
  }
}
let SymMatrix = new SymmetricMatrix(5, (x, y) => `${x},${y}`);
console.log(SymMatrix.get(2, 3));
// → 3,2
// *****<<>><<>>*****
// Encapsulation, Polymorphism and Inheritcance are the three big ideas of object oriented programming:

// Interface: The outward facing element of an encapsulation which interacts with other parts of the code
// Encaps: Writing code to be stand-alone, only interacting with other pieces through an interface
// Polym: Code written with an interface that allows for the input of any type of object that fits said interface
// Inher: Allows for easy creation of near copies of old classes with slightly different properties

// Encapsulation and polymorphism untangle the program, while inheritcance does the opposite
// Thus, inheritance should be used only sparingly
// *****<<>><<>>*****

// instanceof operator (like typeof), can beused to check the object type of a specific instance
// It will see through subclasses to the superclass, so will evaluate true for both the sub and superclasses
console.log(new SymmetricMatrix(2) instanceof SymmetricMatrix);
// → true
console.log(new SymmetricMatrix(2) instanceof Matrix);
// → true
console.log(new SymmetricMatrix(2) instanceof Object);
// → true
console.log(new Matrix(2, 2) instanceof SymmetricMatrix);
// → false
console.log([1] instanceof Array);
// → true

// Extra Notes:
// keyword "new" calls constuctor of an object, which supposedly are normally capitalized
// In the ES6 class syntax, the class name is the constructor name (ie Matrix)

// ENCAPSULATION, POLYMORPHISM and INHERITANCE once more:
/*
One useful thing to do with objects is to specify an interface for them
and tell everybody that they are supposed to talk to your object only through that interface. 
The rest of the details that make up your object are now **encapsulated**, hidden behind the interface.
*/
/*
More than one type may implement the same interface. 
Code written to use an interface automatically knows how to work with any number of different objects that provide the interface. 
This is called **polymorphism**.
*/
/*
When implementing multiple classes that differ in only some details, 
it can be helpful to write the new classes as subclasses of an existing class, **inheriting** part of its behavior.
*/
