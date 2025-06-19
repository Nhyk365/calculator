//MATH FUNCTIONS
//add
function add(x, y) {
  console.log(parseInt(x) + parseInt(y));
  return parseInt(x) + parseInt(y);
}
//subtract
function subtract(x, y) {
  console.log(parseInt(x) - parseInt(y));
  return parseInt(x) - parseInt(y);
}
//multiplication
function multiply(x, y) {
  console.log(parseInt(x) * parseInt(y));
  return parseInt(x) * parseInt(y);
}
//division
function divide(x, y) {
  console.log(parseInt(x) / parseInt(y));
  return parseInt(x) / parseInt(y);
}

//VARIABLES
let numOne;
let numTwo;
let operator;

//CALC. FUNCTIONS
function operate(num1, num2, operator) {
  if (operator == "+") {
    add(num1, num2);
  } else if (operator == "-") {
    subtract(num1, num2);
  } else if (operator == "*") {
    multiply(num1, num2);
  } else if (operator == "/") {
    divide(num1, num2);
  } else return null;
}
