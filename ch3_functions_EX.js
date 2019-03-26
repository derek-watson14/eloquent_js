// Minimum:
let min = function(a, b) {
  if (a > b) return b;
  else return a;
}
console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10

// Recursion:
function isEven(n) {
  if (n == 0) return true;
  else if (n == 1) return false;
  else if (n > 0) return isEven(n - 2);
  else return isEven(n + 2);
}
console.log(isEven(50));
// → true
console.log(isEven(75));
// → false
console.log(isEven(-1));
// → ?? (Without "> 0" check, stack overflow)

// Bean Counting:
function countBsOld(str) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "B") count++;
  }
  return count;
}

function countChar(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) count++;
  }
  return count;
}

function countBs(str) {
  return countChar(str, "B");
}

console.log(countBs("BBC"));
// → 2
console.log(countChar("kakkerlak", "k"));
// → 4
