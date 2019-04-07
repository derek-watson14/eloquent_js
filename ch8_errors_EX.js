// Errors and Bugs Exercises

// 1. Retry
// Recursive method used without hints
// An error class is created so that specific types of errors can be caught by certain functions
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  try {
    return primitiveMultiply(a, b);
  } catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
      return reliableMultiply(a, b);
    } else throw e;
  }
}

// Book Solution:
function reliableMultiplyBook(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) { 
      // Passes on errors that are not of type MultiplicatorUnitFailure down the stack
      // Catches and retires instances of MUF
      if (!(e instanceof MultiplicatorUnitFailure)) throw e; 	
    }
  }
}

console.log(reliableMultiply(8, 8));
// → 64

// 2. The Locked Box
const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true;  },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    }
  };
  
function withBoxUnlocked(body) {
    if (box.locked) {
        try {
            box.unlock();
            return body();
        } finally {
            box.lock();
        }
    } else {
      return body();
    }
}

// Version from answer key
// Prints the error message in this version
// Look into this closer later
function withBoxUnlockedhh(body) {
    let locked = box.locked;
    if (!locked) {
        return body();
    }

    box.unlock();
    try {
        return body();
    } finally {
        box.lock();
    }
}

withBoxUnlocked(function() {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
});
} catch (e) {
    console.log("Error raised:", e);
}

console.log(box.locked);
// → true