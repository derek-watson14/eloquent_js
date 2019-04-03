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
        if (graph[from] == null) {
          graph[from] = [to];
        } else {
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
      if (!roadGraph[this.place].includes(destination)) {
        return this;
      } else { 
        let parcels = this.parcels.map(parcel => {
          if (parcel.place != this.place) return parcel;
          return {place: destination, address: parcel.address};
        }).filter(parcel => parcel.place != parcel.address);
        return new VillageState(destination, parcels);
      }
    }
    static random(parcelCount = 50) {
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

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
      memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
    //console.log("Origin: ", from, "<|> Destination: ", to);
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
      let {at, route} = work[i]; 
      for (let place of graph[at]) {
        //console.log("Checking: ", route.concat(place));
        if (place == to) return route.concat(place);
        if (!work.some(w => w.at == place)) {
          work.push({at: place, route: route.concat(place)});
        }
      }
      //console.log("Routes in work: ", work.map(w => w.route));
    }
}

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

function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
      let parcel = parcels[0];
      if (parcel.place != place) {
        route = findRoute(roadGraph, place, parcel.place);
      } else { 
        route = findRoute(roadGraph, place, parcel.address);
      }
    }
    return {direction: route[0], memory: route.slice(1)};
}

//runRobot(VillageState.random(), goalOrientedRobot, []);

function compareRobots(robot1, memory1, robot2, memory2, robot3, memory3, robot4, memory4) {
    let tests = 1000;
    let r1Total = 0, r2Total = 0, r3Total = 0, r4Total = 0;
    for (let i = 0; i < tests; i++) {
        let state = VillageState.random();
        r1Total += runRobotCompare(state, robot1, memory1);
        r2Total += runRobotCompare(state, robot2, memory2);
        if (robot3) r3Total += runRobotCompare(state, robot3, memory3);
        if (robot4) r4Total += runRobotCompare(state, robot4, memory4);
    }
    r1Avg = r1Total / tests;
    r2Avg = r2Total / tests;
    if (robot3) r3Avg = r3Total / tests;
    else r3Avg = "None";

    if (robot4) r4Avg = r4Total / tests;
    else r4Avg = "None";
    console.log(`Robot 1 Average = ${r1Avg}, Robot 2 Average = ${r2Avg}`);
    console.log(`Robot 3 Average = ${r3Avg}, Robot 4 Average = ${r4Avg}`);
                
}

function runRobotCompare(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
          return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

// Always takes the shortest possible route, very efficient
function germanRobot({place, parcels}, route) {
    if (route.length == 0) {
      	let bestRoute = null;
        for (let packet of parcels) {
          	let possRoute;
            if (packet.place == place) {
              possRoute = findRoute(roadGraph, place, packet.address);
              bestRoute = compareSpeed(possRoute, bestRoute) 
            } else {
              possRoute = findRoute(roadGraph, place, packet.place)
              bestRoute = compareSpeed(possRoute, bestRoute)
            }
        }
        route = bestRoute;
    }
    return {direction: route[0], memory: route.slice(1)};
}
function compareSpeed(possRoute, bestRoute) { 
  if (bestRoute == null) return possRoute;
  else if (possRoute.length < bestRoute.length) return possRoute;
  else return bestRoute;
}

function germanRobot2({place, parcels}, route) {
    if (route.length == 0) {
      	let bestRoute = {route: null, pickup: null};
        for (let packet of parcels) {
              let possRoute = {route: null, pickup: null}
            if (packet.place == place) {
              possRoute = {route: findRoute(roadGraph, place, packet.address), pickup: false};
              bestRoute = compareSpeed2(possRoute, bestRoute) 
            } else {
              possRoute = {route: findRoute(roadGraph, place, packet.place), pickup: true};
              bestRoute = compareSpeed2(possRoute, bestRoute)
            }
        }
        route = bestRoute.route;
    }
    return {direction: route[0], memory: route.slice(1)};
}
function compareSpeed2(possRoute, bestRoute) { 
  if (bestRoute.route == null) return possRoute;
  else if (possRoute.route.length < bestRoute.route.length) return possRoute;
  else if (possRoute.route.length == bestRoute.route.length) {
      if (possRoute.pickup == true && bestRoute.pickup == false) return possRoute;
      else return bestRoute;
  }
  else return bestRoute;
}


function runRobotStats(robot, memory) {
    let tests = 500, fastest = 200, slowest = 0, total = 0;
    for (let i = 0; i < tests; i++) {
        let state = VillageState.random();
        for (let turn = 0;; turn++) {
            if (state.parcels.length == 0) {
                total += turn;
                if (turn < fastest) fastest = turn;
                if (turn > slowest) slowest = turn;
                break;
            }
            let action = robot(state, memory);
            state = state.move(action.direction);
            memory = action.memory;
        } 
    }
    let average = total / tests
    console.log(`Fastest: ${fastest}, Slowest: ${slowest}, Average: ${average}`);
}


//compareRobots(germanRobot, [], germanRobot2, [], goalOrientedRobot, [], routeRobot, []);

runRobotStats(germanRobot2, []);