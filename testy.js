// Creating object properties with a loop
let obby = Object.create(null);
let propNames = ["karen", "nathan", "lucas", "peyton", "brooke", "nathan"];
for (let name of propNames) {
    if (obby[name] == null) {
        obby[name] = 1
    } else {
        obby[name] += 1
    }
}
console.log(obby);