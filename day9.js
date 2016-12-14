var fs = require('fs');
var input = fs.readFileSync('./day9_input.txt', 'utf8');

var regex = /\([0-9]*x[0-9]*\)/;
var decompressed = 0;
var match = regex.exec(input);
while(match) {
  let marker = match[0];
  let index = match.index;

  let markerArray = marker.replace(/\(([0-9]*x[0-9]*)\)/, (match, p1) => p1).split('x');
  let repeatRange = +markerArray[0];
  let repeatTimes = +markerArray[1];

  let repeatPhrase = input.slice(index + marker.length, index + marker.length + repeatRange);
  if (index !== 0) {
    decompressed += index;
  }
  let decompressedTemp = repeatPhrase.repeat(repeatTimes);
  input = input.slice(index + marker.length + repeatRange);


  let temp = regex.exec(decompressedTemp);
  if (temp) {
    decompressed += temp.index;
    decompressedTemp = decompressedTemp.slice(temp.index);
    input = decompressedTemp + input;
  } else {
    decompressed += decompressedTemp.length;
  }

  match = regex.exec(input);
  // console.log(decompressed - 1);
}
decompressed += input.length;
console.log(decompressed - 1);
