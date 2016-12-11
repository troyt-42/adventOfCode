var md5 = require('js-md5');

var doorID = 'ojvtpuvg';
var decoded = false;
var acumulator = 0;
var codeFound = 0;
var answer = new Array(8);
var checkResult;
while (!decoded) {
  checkResult = md5(doorID+acumulator).match(/^00000[0-7]./);
  if (checkResult) {
    console.log(checkResult[0], answer.join(''));
    if (answer[checkResult[0][5]] === undefined) {
      answer[checkResult[0][5]] = checkResult[0][6];
    }
    codeFound++;
    if (answer.join('').split('').length >= 8) {
      decoded = true;
    }
  }
  acumulator++;
}
console.log(answer.join(''));
