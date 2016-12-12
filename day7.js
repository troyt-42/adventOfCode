let fs = require('fs');
let input = fs.readFileSync('./day7_input.txt', 'utf8').split(/[\n]+/);
let answer = 0;

function genCharArray(charA, charZ) {
    let a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
    for (; i <= j; ++i) {
        a.push(String.fromCharCode(i));
    }
    return a;
}

let alphabets = genCharArray('a', 'z');
let possibleABBACombinations = [];
let possibleABACombinations = [];
let possibleBABCombinations = [];

for (let i = 0; i < alphabets.length; i++) {
  let a = alphabets[i];
  for (let p = 0; p < alphabets.length; p++) {
    if (p !== i) {
      let b = alphabets[p];
      possibleABBACombinations.push(a+b+b+a);
      possibleABACombinations.push(a+b+a);
      possibleBABCombinations.push(b+a+b);
    }
  }
}


function isABBA(str) {
  for (let i = 0; i < possibleABBACombinations.length; i++) {
    if (~str.indexOf(possibleABBACombinations[i])) {
      return true;
    }
  }
  return false;
}

function isABA(str) {
  let answer = [];
  for (let i = 0; i < possibleABACombinations.length; i++) {
    if (~str.indexOf(possibleABACombinations[i])) {
      answer.push(possibleABACombinations[i]);
    }
  }
  return answer;
}
function isBAB(str) {
  let answer = [];
  for (let i = 0; i < possibleBABCombinations.length; i++) {
    if (~str.indexOf(possibleBABCombinations[i])) {
      answer.push(possibleBABCombinations[i]);
    }
  }
  return answer;
}

input.forEach(function(value) {
  if (value !== '') {
    let txt = value;
    let regex = /\[([^\[\]]*)\]/g;
    let insideBrackets = [];
    let match = regex.exec(txt);
    while (match !== null) {
      insideBrackets.push(match[1]);
      match = regex.exec(txt);
    }
    let TLSpossible = false;
    let babArray = [];
    for (let i = 0; i < insideBrackets.length; i++) {
      let checkResult = isBAB(insideBrackets[i]);
      if (insideBrackets[i] && checkResult.length !== 0) {
        TLSpossible = true;
        babArray = babArray.concat(checkResult);
      }
    }
    if (TLSpossible) {
      insideBrackets.forEach(function(d) {
        txt = txt.replace('['+d+']', '|');
      });
      let outsideBrackets = txt.split('|');
      TLSpossible = false;
      for (let p = 0; p < outsideBrackets.length; p++) {
        let checkResult = isABA(outsideBrackets[p]);
        if (outsideBrackets[p] && checkResult.length !== 0) {
          for (let i = 0; i < checkResult.length; i++) {
            let convertedABA = checkResult[i][1] + checkResult[i][0] + checkResult[i][1];
            // console.log(outsideBrackets, convertedABA, babArray);
            if (~babArray.indexOf(convertedABA)) {
              TLSpossible = true;
              break;
            }
          }

        }
      }
      if (TLSpossible) {
        answer++;
      }
    }
  }
})
console.log(answer);
