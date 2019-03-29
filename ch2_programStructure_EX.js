// 1. Looping a triangle
// Initial solution:
for (let i = 1; i < 8; i++) {
    console.log("#".repeat(i));
}

// Solution using hints provided:
for (let i = "#"; i.length < 8; i += "#")
    console.log(i);

// 2. FizzBuzz
// Initial Solution: 
let longstring = "";
for (let i = 1; i < 101; i++) {
    if (i % 3 == 0 && i % 5 == 0) longstring += "FizzBuzz";
    else if (i % 3 == 0) longstring += "Fizz";
    else if (i % 5 == 0) longstring += "Buzz";
    else longstring += i
    longstring += ", "    
}
console.log(longstring);
// Problem 2
// Book solution:
for (let n = 1; n <= 100; n++) {
    let output = "";
    if (n % 3 == 0) output += "Fizz";
    if (n % 5 == 0) output += "Buzz";
    // Prints output if "output" or "n" hold a value
    // So when output == "", it still prints, but 
    console.log(output || n); 
    /*  console.log(output && n) would have different results:
        this would only print if both exsisted, then print the result on the right
        thus this would only when there was a string and number,
        but would only print the number
    */
}

// 3. Chessboard
// Initial solution:
let size = 8;
for (let i = 0; i < size; i++) {
    let tempStr = ""
    for (let j = 0; j < size; j++) {
        if (i % 2 == 0) {
            if (j % 2 == 0) tempStr += " ";
            else tempStr += "#";
        } else {
            if (j % 2 == 0) tempStr += "#";
            else tempStr += " "; 
        }
    }
    console.log(tempStr);      
}

// Solution from book:
let theStr = "";
for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        if ((j + i) % 2 == 0) {
            theStr += " ";
        } else {
            theStr += "#"; 
        }
    }
    theStr += "\n"      
}
console.log(`${theStr}`);
