var fs = require('fs');
var input = fs.readFileSync('./day4_input.txt', 'utf8').split(/[\n]+/);
var answer = 0;
for (var i = 0; i < input.length; i++) {
  var room = input[i];
  if (room !== '') {
    var text = room.match(/([a-z]*-)*/)[0].split('').filter((t)=>t!=='-');
    var num = +room.replace(room.match(/([a-z]*-)*/)[0], '').match(/[0-9]*/)[0];
    var checksum = room.replace(room.match(/([a-z]*-)*/)[0]+num, '');

    var realsum = {};
    text.forEach(function(i){
      if (realsum[i] !== undefined) {
        realsum[i]++;
      } else {
        realsum[i] = 1;
      }
    });
    var sumArray = [];
    for (var key in realsum) {
      sumArray.push([key, realsum[key]]);
    }
    sumArray.sort((a, b) => b[1] - a[1]);

    // var tempstr = '';
    // sumArray.forEach(function(b) {
    //   tempstr += b[0]+b[1]+' ';
    //   return b;
    // });
    // console.log(text.join(''), tempstr);
    var newSumArray = {};
    for (var c = 0; c < sumArray.length; c++) {
      var temp = sumArray[c];
      if (newSumArray[temp[1]]) {
        newSumArray[temp[1]].push(temp[0]);
      } else {
        newSumArray[temp[1]] = [temp[0]];
      }
    }
    sumArray = [];
    for (var key in newSumArray) {
      sumArray.push([key, newSumArray[key]]);
    }
    sumArray.sort((a, b) => b[0] - a[0]);
    var temp = [];
    sumArray.forEach(function(b){
      temp.push(b[1]);
    })
    // console.log(tempstr, temp);

    var converted = [];
    var currentOrder = 0;
    for (var s = 0; s < 5; s++) {
      var index = temp.findIndex(function(t) {
        return t.indexOf(checksum[1+s]) !== -1;
      });
      converted.push(index);
    }
    // console.log(temp, converted, checksum);
    if (~converted.indexOf(-1)) {
      continue;
    } else {
      if (converted === converted.sort() && converted[0] === 0) {
        var temp3 = temp.map((d) => d.length);
        var temp4 = [0];
        converted.forEach(function(d){
          if (temp4[d] === undefined){
            temp4[d] = 1;
          } else {
            temp4[d]++;
          }
        });
        var passed = true;
        for (var r = 0; r < temp4.length; r++) {
          if (temp4[r] !== temp3[r]) {
            if (r !== temp4.length - 1) {
              passed = false;
            }
          }
        }
        if (passed) {
          answer += +num;
        }
        console.log(temp, converted, temp3, checksum, temp4, num, answer);
      }
    }
  }
}
console.log(answer);
