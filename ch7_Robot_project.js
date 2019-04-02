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
console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office

// Object.freeze causes updates to an object to be ignored, thus making it immutable or persistent
let object = Object.freeze({value: 5});
object.value = 10;
console.log(object.value);
// → 5

function runRobot(state, robot, memory) {
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
let randomEx = function(parcelCount = 5) {
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
runRobot(VillageState.random(), randomRobot);
