var fs = require('fs');
var input = fs.readFileSync('./day6_input.txt', 'utf8').split(/[\n]+/);
// var grid = [
//   [], [], [], [], [], [], [], []
// ];

var count = [
  {}, {}, {}, {}, {}, {}, {}, {}
]
input.forEach(function(d) {
  if (d !== '') {
    for (var i = 0; i < 8; i++) {
      if (count[i][d[i]] === undefined) {
        count[i][d[i]] = 1;
      } else {
        count[i][d[i]]++;
      }
    }
  }
});

var answer = '';
for (var i = 0; i < 8; i++) {
  var obj = count[i];
  console.log(obj);
  answer += Object.keys(obj).reduce(function(a, b){ return obj[a] < obj[b] ? a : b });
}
console.log(answer);
