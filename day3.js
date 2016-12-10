var fs = require('fs');
var input = fs.readFileSync('./day3_input.txt', 'utf8').split(/[\n]+/);
var firstCol = [];
var secCol = [];
var thirdCol = [];
input.map(function(d) {
  d = d.split(' ').filter((t) => t !== '');
  if (d.length === 3) {
    firstCol.push(d[0]);
    secCol.push(d[1]);
    thirdCol.push(d[2]);
  }
})
input = firstCol.concat(secCol, thirdCol);
var possible = 0;

for (var i = 0; i < input.length; i += 3) {
  var a = +input[i];
  var b = +input[i+1];
  var c = +input[i+2];
  if (a && b && c) {
    if (((a+b) > c) && ((a+c) > b) && ((b+c) > a)) {
      // console.log(a,b,c);
      possible++;
    }
  }
}
console.log(possible);
