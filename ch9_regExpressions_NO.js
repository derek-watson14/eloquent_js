// Regular Expressions
// Regular expressions are a language syntax used in JS and other languages
// to describe patterns in string data,
// it is commonly used to search for described patterns

// Creating a RegExp:
// Two syntaxes to create such expressions:
let re1 = new RegExp("abc");
let re2 = /abc/;
console.log(re1.test("ppggabcggpp")); // -> true
console.log(re1.test("bac")) // -> false
// With the second syntax, since it is wrapped with /, / in the pattern must be escaped with \
// Reg expressions have special character codes like \n 
// But they also have special individual characters like ? and + which must be escaped to be used normally

// Test method, as seen above, can be used as boolean to test if a string contains a RegExp
// This could also be accomplished with index of:
console.log("ppggabcggpp".indexOf("abc")) // -> 4
// But reg expressions allow for more complex pattern detection

// Putting a set of chars between square brackets makes that part match any chars between the brackets
console.log(/[0123456789]/.test("in 1992"));
// → true
console.log(/[0-9]/.test("in 1992"));
// → true
// A hyphen can be used to indicate a range according to unicode
// Some common char groups have built in shortcuts:
// \d = Any digit char
// \w = any alphanumeric
// \s = any whitespace char (space, tab, newline, etc)
// . = Any character but a newline
// Capitalizing those letters is like adding a bang! Will return true if not one of those things

// Ensure date time is matching:
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20"));
// → true
console.log(dateTime.test("30-jan-2003 15:20"));
// → false

// Special chars can also be used inside of [], creating a set of chars
// for example:
let moneyA = /[\d.\$]/; // True for any stiring that includes a digit, period or $ sign
console.log(moneyA.test("$32.55a")); // -> true

// A character set can also be inverted with the ^ symbol right after the first square bracket of the set:
// Meaning to look for any character except the ones in the set
// This goes immediately after the opening bracket
let notBinary = /[^01]/;
console.log(notBinary.test("1100100010100110"));
// → false
console.log(notBinary.test("1100100010200110"));
// → true

// When putting a plus sign after something in a regular expression,
// it indicates it can be repeated, so /\d+/ will match 1+ digit chars
// A star (*) on the other hand allows a pattern item to either repeat or not be present at all
// Finally a ? makes a pattern optional, so it can occur 0 or 1 time

let moneyB = /\$\d*\.(\d\d)?/
console.log(moneyB.test("$3586.55")); // -> true
console.log(moneyB.test("$.35")); // -> true
console.log(moneyB.test("$5")); // -> true
console.log(moneyB.test("4453.73456")); // -> false

// Curly brackets can also be places after an element to specify how many times it should be used, or a range
let dateTimeB = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
//console.log(dateTimeB.test("1-30-2003 8:45")); // → true

// {4} = exactly 4 times; {2,4} = 2 - 4 times; {5,} five or more

// To use operators like *, +, ? for a group of elements, parentheses are used
// The part in parentheses is a single element to the operator
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true
// The boo can have 2+ o's, as can the hoo, and there can be multiple hoos\
// the i after the expression marks the whole expression as case Insensitive
let moneyC = /\$\d*\.?(\d\d)?$/


// Regular expressions also have an exec (execute) method which returns an object with information or null
let match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8

// Strings have a match method which is similar to the .index method of the exec object
console.log("one two 100".match(/\d+/));
// → ["100"]

// The exec method will return an array of matches,
// The first element will be matches of the whole expresion, next will come matches of subexpression
// The sub expression matches will come in order

// Some chars contained in single quotes, with no single quotes within single quotes
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]

// When a group isnt matched at all, its position in output array willbe undefines
// If it matches multiple times, only the last match is in array
console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]

// The Date Class in JavaScript:
// If you create a date object using new, you get the current date and time
console.log(new Date()); // -> full current date and time
// Can also create object for specific time:
console.log(new Date(2009, 11, 9));
// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)

// In JavaScript month numbers start at 0, but day numbers start at 1 (1-11 = 1. Dec.)
// Timestamps are stored as the number of milliseconds since the start of 1970
// Follows Unix time convention: get time returns the number of miliseconds
console.log(new Date(1992, 5, 05).getTime());
// -> 707695200000
console.log(new Date(707695200000));
// -> Fri Jun 05 1992 00:00:00 GMT+0200 (Central European Summer Time)
// → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)
// Which can then be passed back into the Date constructor to get the date

// Current number of miliseconds since I was born:
console.log(new Date().getTime() - new Date(1992, 5, 05).getTime());
// Other Date object methods inlude:
// getFullYear, getMonth, getDate, getHours, getMinutes, getSeconds

// We can now create a Date object from a string using regular expression
// So long as the date is passed in in the correct format
function getDate(string) {
    let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
    return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

// The above method can return non sensical data, because a match can occur anywhere in the string
// The markers ^ and $ can be used to mark the beginning and the end of the string
let moneyC = /^\$\d*\.?(\d\d)?$/
console.log(moneyC.test("23$3586.34")); // -> false

// There is also a boundry marker \b
// A word boundary can be the start or end of the string 
// or any point in the string that has a word character (as in \w) on one side and a nonword character on the other.
// In human terms, it essentially means it must be its own word (or number)
console.log(/cat/.test("concatenate"));
// → true
console.log(/\bcat\b/.test("concatenate"));
// → false
console.log(/\bcat\b/.test("con cat enate"));
// → true

// Choice patterns