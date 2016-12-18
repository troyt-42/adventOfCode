var fs = require('fs');
var inputs = fs.readFileSync('./day10_input.txt', 'utf8').split(/[\n]+/);

var bots = {};
var rules = {};

var outputBox = {};
var inputBox = {};
inputs.forEach(function(input) {
  let numbers = input.match(/[0-9]*/g).filter((d) => d !== '');
   if (numbers.length === 3) {
    // collect initial rules
    let bot = numbers[0];
    let low = numbers[1];
    let high = numbers[2];
    let lowType = '';
    let highType = '';
    if (input.match('output ' + low)) {
      lowType = 'output';
    } else if (input.match('input ' + low)) {
      lowType = 'input';
    }  else if (input.match('bot ' + low)) {
      lowType = 'bot';
    } else {
      console.log('Error type');
    }

    if (input.match('output ' + high)) {
      highType = 'output';
    } else if (input.match('input ' + high)) {
      highType = 'input';
    } else if (input.match('bot ' + high)) {
      highType = 'bot';
    } else {
      console.log('Error type');
    }
    rules[bot] = {
      'low': [lowType, low],
      'high': [highType, high]
    };
  }
})

function executeComparsion (bot, value1, value2) {
  if ((+value1 === 17 && +value2 === 61)) {
    console.log(bot);
  }
  let rule = rules[bot];
  let high = +value1 > +value2 ? +value1 : +value2;
  let low = +value2 === +high ? +value1 : +value2;
  // console.log(rule, high, low, bots);
  if (rule.low[0] === 'output') {
    if (outputBox[rule.low[1]]) {
      outputBox[rule.low[1]].push(low);
    } else {
      outputBox[rule.low[1]] = [low];
    }
  } else if (rule.low[0] === 'input') {
    if (inputBox[rule.low[1]]) {
      inputBox[rule.low[1]].push(low);
    } else {
      inputBox[rule.low[1]] = [low];
    }
  } else if (rule.low[0] === 'bot') {
    if (bots[rule.low[1]]) {
      bots[rule.low[1]].push(low);
    } else {
      bots[rule.low[1]] = [low];
    }
  }

  if (rule.high[0] === 'output') {
    if (outputBox[rule.high[1]]) {
      outputBox[rule.high[1]].push(high);
    } else {
      outputBox[rule.high[1]] = [high];
    }
  } else if (rule.high[0] === 'input') {
    if (inputBox[rule.high[1]]) {
      inputBox[rule.high[1]].push(high);
    } else {
      inputBox[rule.high[1]] = [high];
    }
  } else if (rule.high[0] === 'bot') {
    if (bots[rule.high[1]]) {
      bots[rule.high[1]].push(high);
    } else {
      bots[rule.high[1]] = [high];
    }
  }

  if (rule.high[0] === 'bot') {
    if (bots[rule.high[1]].length >= 2) {
      // console.log(bots[rule.high[1]], rule.high[1]);
      executeComparsion(rule.high[1], bots[rule.high[1]][0], bots[rule.high[1]][1]);
      bots[rule.high[1]] = [];
    }
  }

  if (rule.low[0] === 'bot') {
    if (bots[rule.low[1]].length >= 2) {
      // console.log(bots[rule.low[1]], rule.low[1]);
      executeComparsion(rule.low[1], bots[rule.low[1]][0], bots[rule.low[1]][1]);
      bots[rule.low[1]] = [];
    }
  }

}
inputs.forEach(function(input) {
  let numbers = input.match(/[0-9]*/g).filter((d) => d !== '');
  if (numbers.length === 2) {
    //starts feeding data
    let value = numbers[0];
    let bot = numbers[1];
    if (bots[bot]) {
      bots[bot].push(value);
      if (bots[bot].length >= 2) {
        executeComparsion(bot, bots[bot][0], bots[bot][1]);
        bots[bot] = [];
      }
    } else {
      bots[bot] = [value];
    }
  }
})

console.log('RULEs', rules);
console.log('BOTs:', bots);
console.log('OUTPUTs:', outputBox);
console.log(outputBox[0] * outputBox[1] * outputBox[2]);
