var fs = require('fs');
var input = fs.readFileSync('./day4_input.txt', 'utf8').split(/[\n]+/);
for (var i = 0; i < input.length; i++) {
  var room = input[i];
  if (room !== '') {
    var text = room.match(/([a-z]*-)*/)[0].split('');
    var num = +room.replace(room.match(/([a-z]*-)*/)[0], '').match(/[0-9]*/)[0];
    var checksum = room.replace(room.match(/([a-z]*-)*/)[0]+num, '');


    var decoded = text.map(function(d) {
      if (d === '-') return ' ';
      return String.fromCharCode((d.charCodeAt(0) - 97 +num) % 26 + 97);
    })
    // console.log(decoded.join(''), num);
    if (decoded.join('') === 'northpole object storage ') {
      console.log('northpole object storage:', num);
    };

  }
}
