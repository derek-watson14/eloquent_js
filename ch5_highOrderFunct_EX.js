// 1. Flattening:

let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays.reduce((aX, aY) => {
  return aX.concat(aY);
}));
// → [1, 2, 3, 4, 5, 6]

// 2. Your Own Loop:

function loop(val, test, update, body) {
  for (val; test(val); val = update(val)) {
    body(val);
  }
}
loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
