// Example function from summarizing with reduce section
// Added extra printing for clarity of operation
function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    // console.log(`${count}, ${script.name}`);
    return count + (to - from);
  }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
  console.log(a, b);
  return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}
