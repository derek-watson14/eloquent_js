const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];
  
function buildGraph(edges) {
    let graph = Object.create(null);
    for (let [from, to] of edges.map(r => r.split("-"))) {
      addEdge(from, to);
      addEdge(to, from);
    }
    function addEdge(from, to) {
        // if graph[from] property == null, 
        // Create a propery with that name, and add "to" to start a list there
        // [from] is shorthand to create a property with a variable name
        if (graph[from] == null) {
          graph[from] = [to];
        } else { // If there is already a list started, push the next value
            graph[from].push(to);
        }
      }
    return graph;
}
const roadGraph = buildGraph(roads);
  
class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    // Check if there is a road going from current place to destination
    // If not, retrun current state
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } 
    // Else create new state w/ destination as place, and updated parcel list
    // Map "moves" the parcels: for each parcel, if the parcel is not at the current place,
    // it doesn't change it, if it it at the current place, it updates its place to the new destination(maintaining its address)
    // In this set up all parcels in entire village are tracked, not just ones robot is currently carrying
    // Filter then delivers the packages, by removing parcels from the list that now have a place equal to their address
    else { 
      let parcels = this.parcels.map(parcel => {
        if (parcel.place != this.place) return parcel;
        return {place: destination, address: parcel.address};
      }).filter(parcel => parcel.place != parcel.address);
      return new VillageState(destination, parcels);
    }
  }
  static random(parcelCount = 5) {
      let parcels = [];
      for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
          place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
      }
      return new VillageState("Post Office", parcels);
    };
}
// The parcel list isn't changed when moved but an entirely new list is created
let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");
/* 
console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office
*/

// Object.freeze causes updates to an object to be ignored, thus making it immutable or persistent
let object = Object.freeze({value: 5});
object.value = 10;
/*
console.log(object.value);
// → 5
*/

function runRobot(state, robot, memory) {
  // Note: condition ommitted from for loop  
  for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        console.log(`Done in ${turn} turns`);
        break;
      }
      let action = robot(state, memory);
      state = state.move(action.direction);
      memory = action.memory;
      console.log(`Moved to ${action.direction}`);
    }
}

// Robot that wanders randomly:
// Would be inserted in place of "robot(state, memory)" above
function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length); // Gives random array index
    return array[choice];
}

// Create random state with parcels: 
// also added as static method in VillageState class above
let randomEx = function(parcelCount = 8) {
    let parcels = [];
    // Create address, then current place state that is not address for each package
    for (let i = 0; i < parcelCount; i++) {
      let address = randomPick(Object.keys(roadGraph));
      let place;
      do {
        place = randomPick(Object.keys(roadGraph));
      } while (place == address);
      parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

// Uses run robot function, uses static method random to create random starting state,
// and passes in random robot to do work
// Will print moves and number of turns required ~40 - 140 moves to deliver 5 packages
/* 
runRobot(VillageState.random(), randomRobot);
*/

// First idea to improve on the randomRobot: the mailRoute robot
// mailRoute robot can do a loop twice and is gauranteed to deliver all mail
const mailRoute = [
  "Alice's House", "Cabin", "Alice's House", "Bob's House",
  "Town Hall", "Daria's House", "Ernie's House",
  "Grete's House", "Shop", "Grete's House", "Farm",
  "Marketplace", "Post Office"
];
// Route roboot utilizes memory, runs a 13 step route twice to gaurantee success
// Memory is fed in as empty, when empty it will pick up mail route,
// removes items from mail route as it goes, picking up a new one when it reaches 0 
function routeRobot(state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return {direction: memory[0], memory: memory.slice(1)};
}
/*
runRobot(VillageState.random(), routeRobot, []);
*/

/* PLAIN ENGLISH
 * This function takes from and to, and systematically checks all the possible routes requiring one move
 * then all the possible routes requiring two moves, then all the possible routes requiring three, etc.
 * When the route is landed on, it must be the shortest (or equally as short as alternatives),
 * becuase the function will never check 4 step routes before three step routes, nd if it hasn't yet been found
 * then there is no possible way in 2 or 1 step.
 * Use the console logs commented out to see how it works
*/
function findRoute(graph, from, to) {
  console.log("Origin: ", from, "Destination: ", to);
  // This is the work list:
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i]; 
    // Loop through all possible destinations from work[i][at]
    for (let place of graph[at]) {
      console.log("Checking: ", route.concat(place));
      // If the place is the destination, return the route, with this place added to the end
      if (place == to) return route.concat(place);
      // If this place is not yet in the work list, add the place and this route to work list
      // It will be added to the end of the work list, so as i continues to iterate, it will eventually reach this item if needed
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
      // If place has been reached before throw this route away, because the easlier one is less than or equally as short
    }
    console.log("Routes in work: ", work.map(w => w.route));
  }
}

function goalOrientedRobot({place, parcels}, route) {
  // If theres no route
  if (route.length == 0) {
    // Take bottom parcel on the stack
    let parcel = parcels[0];
    // If the parcels place isn't the current location, find a route to get to it
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else { // If the parcels place is the current location, find a route to drop it off
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  // Returns first step in route, and a command to slice each step as command is followed
  // When route length is 0, will search for a new route, first to a new package, then to deliver
  return {direction: route[0], memory: route.slice(1)};
}

function runRobotHERE(state, robot, memory) {
  // Note: condition ommitted from for loop  
  for (let turn = 0;; turn++) {
      if (state.parcels.length == 0) {
        console.log(`Done in ${turn} turns`);
        break;
      }
      //let action = robot(state, memory);
      state = state.move(robot.direction);
      memory = robot.memory;
      console.log(`Moved to ${robot.direction}`);
    }
}
runRobot(VillageState.random(), goalOrientedRobot, []);
