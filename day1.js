var input = "L4, L1, R4, R1, R1, L3, R5, L5, L2, L3, R2, R1, L4, R5, R4, L2, R1, R3, L5, R1, L3, L2, R5, L4, L5, R1, R2, L1, R5, L3, R2, R2, L1, R5, R2, L1, L1, R2, L1, R1, L2, L2, R4, R3, R2, L3, L188, L3, R2, R54, R1, R1, L2, L4, L3, L2, R3, L1, L1, R3, R5, L1, R5, L1, L1, R2, R4, R4, L5, L4, L1, R2, R4, R5, L2, L3, R5, L5, R1, R5, L2, R4, L2, L1, R4, R3, R4, L4, R3, L4, R78, R2, L3, R188, R2, R3, L2, R2, R3, R1, R5, R1, L1, L1, R4, R2, R1, R5, L1, R4, L4, R2, R5, L2, L5, R4, L3, L2, R1, R1, L5, L4, R1, L5, L1, L5, L1, L4, L3, L5, R4, R5, R2, L5, R5, R5, R4, R2, L1, L2, R3, R5, R5, R5, L2, L1, R4, R3, R1, L4, L2, L3, R2, L3, L5, L2, L2, L1, L2, R5, L2, L2, L3, L1, R1, L4, R2, L4, R3, R5, R3, R4, R1, R5, L3, L5, L5, L3, L2, L1, R3, L4, R3, R2, L1, R3, R1, L2, R4, L3, L3, L3, L1, L2";
var inputArray = input.replace(/ /g, '').split(',');

var cordinates = [0,0];
var directions = ['N', 'E', 'S', 'W'];
var currentDirection = 0;
var visitedPlaces = [];
var firstPlaceVistedTwice = [];
var found = false;
for (var i = 0; i < inputArray.length; i++) {
  var instruction = inputArray[i];
  var turn = instruction[0];
  if (turn === 'R') {
    currentDirection += 1;
    if (currentDirection > 3) currentDirection = 0;
  } else if (turn === 'L') {
    currentDirection -= 1;
    if (currentDirection < 0) currentDirection = 3;
  }
  var steps = +instruction.slice(1);
  var visitedTemp = [];
  for (var p = 0; p < steps; p++) {
    if (directions[currentDirection] === 'N') {
        visitedTemp.push(cordinates.slice());
        cordinates[0] += 1;
    } else if (directions[currentDirection] === 'E') {
        visitedTemp.push(cordinates.slice());
        cordinates[1] += 1;
    } else if (directions[currentDirection] === 'S') {
        visitedTemp.push(cordinates.slice());
        cordinates[0] -= 1;
    } else if (directions[currentDirection] === 'W') {
        visitedTemp.push(cordinates.slice());
        cordinates[1] -= 1;
    } else {
      console.log("Error Encountered");
      break;
    }
  }

  if (!found) {
    var filtered = visitedTemp.filter(function (d) {
      return visitedPlaces.findIndex((t) => d[0] === t[0] && d[1] === t[1]) !== -1;
    });
    if (filtered.length !== 0) {
      found = true;
      firstPlaceVistedTwice = filtered[0].slice();
    } else {
      visitedPlaces = visitedPlaces.concat(visitedTemp);
    }
  }
}
console.log(firstPlaceVistedTwice, cordinates);
console.log(Math.abs(cordinates[0] - firstPlaceVistedTwice[0])+Math.abs(cordinates[1] - firstPlaceVistedTwice[1]));
