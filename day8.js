var fs = require('fs');
var inputs = fs.readFileSync('./day8_input.txt', 'utf8').split(/[\n]+/);

var grid = [];

var width = 50;
var height = 6;
//initialize the grid
for (let i = 0; i < height; i++) {
  grid[i] = new Array(width);
  grid[i].fill(' ');
}

function printGrid() {
  for (let i = 0; i < height; i++) {
    console.log(grid[i].join(''));
  }
}

printGrid();

inputs.forEach(function(input) {
  if (input !== '') {
    let command = input.match(/^[a-z]* /)[0];
    if (command === 'rect ') {
      let dim = input.match(/[0-9]*x[0-9]*/)[0].split('x');
      let drawW = +dim[0];
      let drawH = +dim[1];
      for (let i = 0; i < drawH; i++) {
        for (let p = 0; p < drawW; p++) {
          grid[i][p] = '*';
        }
      }
      console.log(input);
      printGrid();
    } else if (command === 'rotate ') {
      let dim = input.match(/[0-9]* by [0-9]*/)[0].split(' by ');
      let param1 = +dim[0];
      let param2 = +dim[1];
      if (input.match(/column/)) {
        for (let i = 0; i < param2; i++) {
          let temp = new Array(width).fill(' ');
          for (let i = 0; i < height; i++) {
            let p = i + 1 >= height ? 0: i + 1;
            temp[p] = grid[i][param1];
          }
          for (let i = 0; i < height; i++) {
            grid[i][param1] = temp[i];
          }
        }
        console.log(input);
        printGrid();
      } else if (input.match(/row/)) {
        for (let i = 0; i < param2; i++) {
          let temp = new Array(width).fill(' ');
          for (let i = 0; i < width; i++) {
            let p = i + 1 >= width ? 0: i + 1;
            temp[p] = grid[param1][i];
          }
          grid[param1] = temp;
        }
        console.log(input);
        printGrid();
      }
    }
  }
});

var howManyLit = 0;
grid.forEach(function(row) {
  for (let i = 0; i < width; i++) {
    if (row[i] === '*') {
      howManyLit++;
    }
  }
})
console.log('How many pixels get lit:', howManyLit);
