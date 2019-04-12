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
// Using the pipe character | denotes a choice between the patterns to its left and right
// Parentheses can be used to limit the part of the expression the choice beongs to, mutiple extends the choice
let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;
console.log(animalCount.test("15 pigs"));
// → true
console.log(animalCount.test("15 pigchickens"));
// → false

// Mechanisms of matching

// Starting left to right, either the first match will be found or none at all
// When a match attempt braches, as with a +, * or | symbol, the position before testing the brach is saved
// Thus the program can return to its save point to try another branch if necessary
// If mutiple branches could be evaluated to true, the first one (in the order they are written) is taken
// Matching /^.*x/ against "abcxe", the .* will first try the whole string, than 4 chars then 3, where it will succeed in finding an x at the end
// /\b[01]+b\b/ (good) vs /\b([01]+)+b\b/ (bad)
// Both try to match binary characters with a trailing b character
// The second one however, because it looks for 1+ characters within set [01], will check every possible length of 0s and 1s
// So for 01001010001010010 with no b on end, it will search for 17 chars with b on end, then 16, then 15 etc
// The one on left will test if the entire string is only 0s and 1s, and check for a b at the end

let badBinary = /\b([01]+)+b\b/;
let goodBinary = /\b[01]+b\b/;
let testValue = " 10101001000010101010010010010 ";
console.log("Good: ", goodBinary.test(testValue)); // Almost instant
// console.log("Bad: ", badBinary.test(testValue)); // Takes 15 seconds

// The moral is, be careful how you write, and consider the loop back for branches
// Put most likely values first and watch syntax

// Replace method of strings:
console.log("papa".replace("p", "m"));
// → mapa
// The first argument of replace can also be a regular expression
// Adding a g after the regular expression means all matches will be replaced
console.log("Borobudur".replace(/[ou]/, "a"));
// → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a"));
// → Barabadar

// Swapping first and last names in a long list
console.log(
    "Liskov, Barbara\nMcCarthy, John\nWadler, Philip\nWatson, Derek"
      .replace(/(\w+), (\w+)/g, "$2 $1"));
// → Barbara Liskov
//   John McCarthy
//   Philip Wadler
//   Derek Watson

// Group 1: 1+ alphanums, Group 2: 1+ alphanums (comma and space seperated)
// The $2 and $1 can be used to swap their positions
// The $1 refers to the first parentheses group, $2 the second and so on ($9) is the maximum
// $& will return the whole regular expression match

// A string can be passed as the second argument of the replace function:
let s = "the cia and fbi";
console.log(s.replace(/\b(fbi|cia)\b/g,
        str => str.toUpperCase()));
// → the CIA and FBI

// More complicated example, take one item from the inventory:
let stock = "1 lemon, 2 cabbages, and 101 eggs";
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) { // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = "no";
  }
  return amount + " " + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs

// Here, the function minusOne automatically recieves arguments from the regular expression
// match is the whole string of the match ($&), amount is $1 and unit is $2

// This function removes all commentsfrom a piece of js code
// It replaces anything after and including a // or between and including /* */ with ""
// . == [^] (. = anything); ([^] = anything except nothing)
// However the . character will not match newlines, this a simple . cannot be used
function stripComments(code) {
    return code.replace(/\/\/.*|\/\*[^]*\*\//g, "");
}
console.log(stripComments("1 + /* 2 */3"));
// → 1 + 3
console.log(stripComments("x = 10;// ten!"));
// → x = 10;
console.log(stripComments("1 /* a */+/* b */ 1"));
// → 1  1 (wrong, should keep the + sign)

// Issue is [^]* first tries to match whole string and backtracks from there
// Eventually it reaches the first */ and calls that a match, removing the + sign
// The repetition operators (+, *, ?, and {}) are "greedy", matching as much as possible
// if you put a ? after them, they are non-greedy, matching more only when pattern doesnt match smaller section
// Inserting the ? after greedy operator * here solves the problem above
function stripComments2(code) {
    return code.replace(/\/\/.*|\/\*[^]*?\*\//g, "");
}
console.log(stripComments2("1 /* a */+/* b */ 1"));
// → 1 + 1

// Bugs can often be traced to this fact. Consider using the non greedy operator before the greey one

// Dynamically creating RegExp objects
// Cannot use slash based notation, but must use rather this notation from beginning
let othreNote = new RegExp("abc");
// However it must be used like so:
let name55 = "harry";
let text55 = "Harry is a suspicious character.";
let regexp55 = new RegExp("\\b(" + name55 + ")\\b", "gi");
console.log(text55.replace(regexp55, "_$1_"));
// → _Harry_ is a suspicious character.

// Note: must use an extra \ for boundry because it is a regular string and the \ must be escaped
// Second argument contains the options for the expression g for global and i for case insensitve
// If a name has special characters, they must be excaped in an extra step using the replace method
//

let name66 = "dea+hl[]rd";
let text66 = "This dea+hl[]rd guy is super annoying.";
let escaped66 = name66.replace(/[\\[.+*?(){|^$]/g, "\\$&");
let regexp66 = new RegExp("\\b" + escaped66 + "\\b", "gi");
console.log(text66.replace(regexp66, "_$&_"));
// → This _dea+hl[]rd_ guy is super annoying.

// The search method of strings is like indexOf but it expects a regular expression not a function
console.log("  word".search(/\S/));
// → 2
console.log("    ".search(/\S/));
// → -1

// lastIndex property:
// Can be used to control where the next match will start
// If either g or y (sticky) is enabled on the regexp
let pattern7 = /y/g;
pattern7.lastIndex = 3; // start from 3
let match7 = pattern7.exec("xyzzy");
console.log(match7.index);
// → 4 (ie still reports true position)
console.log(pattern7.lastIndex);
// → 5 (next y after [3] is 5)

// If something is found last index will be automatically updated to the point after the last match
// If no match is found last index is set back to 0
// With sticky (y) a match will succeed only if it is found directly at last index, whereas global will search

let global3 = /abc/g;
console.log(global3.exec("xyz abc"));
// → ["abc"]
let sticky3 = /abc/y;
console.log(sticky3.exec("xyz abc"));
// → null
sticky3.lastIndex = 4;
console.log(sticky3.exec("xyz abc"));
// → ["abc"]

// If you use a regular expression for multiple exec calls, the auto update lastIndex can cause problems:
let digit = /\d/g;
console.log(digit.exec("here it is: 1"));
// → ["1"]
console.log(digit.exec("and now: 1"));
// → null

// The global tag of regexps also changes how the match method of strings works
// Match will then find all matches of strings and return an array of the results
console.log("Banana".match(/an/g));
// → ["an", "an"]

// So be cautious with global regular expressions. 
// The cases where they are necessary (calls to replace and places where you want to explicitly use lastIndex)
// are typically the only places where you want to use them.

// Looping over matches:

// This finds and prints all numbers in the string
let input11 = "A string with 3 numbers in it... 42 and 88.";
let number11 = /\b\d+\b/g;
let match11;
// Bascially will run while number.exec(input) doesnt return null, which it does when no matches remain
while (match11 = number11.exec(input11)) {
  console.log("Found", match11[0], "at", match11.index);
}
// → Found 3 at 14
//   Found 42 at 33
//   Found 88 at 40


// Parsing an INI file: 

function parseINI(string) {
  // Start with an object to hold the top-level fields
  let result = {};
  let section = result;
  // Both of above point at same object
  string.split(/\r?\n/).forEach(line => {
    let match;
    if (match = line.match(/^(\w+)=(.*)$/)) {
      // When a x=y line, create a new binding x in common object and assign y as its value
      // Result and section are still pointed at the general object
      section[match[1]] = match[2];
    } else if (match = line.match(/^\[(.*)\]$/)) {
      // If the line is a [z] subheading, make result.z = an empty object, point section at that object
      // Result is still pointed at the greater object, so new subobjects can be greated if new subheaders are found
      // Section will always be pointed in the current subheader, so gerneral properties must be at the top
      // But after making a subheader object, all x=y lines will be written to that sub, until a new one is found
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error("Line '" + line + "' is not valid.");
    }
  });
  return result;
}
console.log(parseINI(`
name=Vasilis
[address]
city=Tessaloniki
state=WA`));
// → {name: "Vasilis", address: {city: "Tessaloniki"}}

// International characters
// For some reason \w only includes 26 english characters, 0-9 and the _, outside of that all chars will match \W
// however \s the whitespace detection character is modern unicode standard

console.log(/🍎{3}/.test("🍎🍎🍎"));
// → false
console.log(/<.>/.test("<🌹>"));
// → false
console.log(/<.>/u.test("<🌹>"));
// → true

// Regular expressions work on code units not on characters, so multi unit characters will behave strangely
// The u option must be added to the regular expression (like g for global) to make it test for unicode
// Not widely supported yet but possible to use \p to test for unicode properties in regular expressions
console.log(/\p{Script=Greek}/u.test("α"));
// → true
console.log(/\p{Script=Arabic}/u.test("α"));
// → false
console.log(/\p{Alphabetic}/u.test("α"));
// → true
console.log(/\p{Alphabetic}/u.test("!"));
// → false
// Both \p{Property=Value} and \p{PropertyName} work, though if using the latter only certain properties are accepted

// Regular expressions are objects that represent patterns in strings:

// Test will return true if it contains: 
// /abc/	A sequence of characters
// /[abc]/	Any character from a set of characters
// /[^abc]/	Any character not in a set of characters
// /[0-9]/	Any character in a range of characters
// /x+/	One or more occurrences of the pattern x
// /x+?/	One or more occurrences, nongreedy
// /x*/	Zero or more occurrences
// /x?/	Zero or one occurrence
// /x{2,4}/	Two to four occurrences
// /(abc)/	A group
// /a|b|c/	Any one of several patterns
// /\d/	Any digit character
// /\w/	An alphanumeric character (“word character”)
// /\s/	Any whitespace character
// \D	A character that is not a digit
// \W	A nonalphanumeric character
// \S	A nonwhitespace character
// /./	Any character except newlines
// /\b/	A word boundary
// /^/	Start of input
// /$/	End of input

// RegExp have test and exec, test returns boolean, exec returns array of matches.
// The array will have an index property to indicate its start point

// String have match, search and replace to work with regular expressions:
console.log("abcdabc".match(/bc/));
// -> [ 'bc', index: 1, input: 'abcd', groups: undefined ] (info about first match)
console.log("abcdabc".search(/bc/));
// -> 1 (starting position of match)
console.log("abcdabc".replace(/bc/, "BC"));
// -> aBCdabc (replaces first match with specified replacement)

// RegExps also have options, written after the closing slash
// /x/i makes match case *insensitve*
// /x/g makes expression *global*, making replace work on all instances
// /x/y *sticky* means it will not search ahead and skip part of the string when looking for a match
// /x/u turns on unicode mode, makes expressions handle code units better

// Regular expressions are a sharp tool with an awkward handle.
// Part of knowing how to use them is resisting the urge to try to shoehorn things that they cannot cleanly express into them.
