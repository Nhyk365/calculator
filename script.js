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

//CALC. FUNCTION
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

//DOC VARIABLES
const screen = document.getElementById("screen");
//buttons variables
const deleteButton = document.getElementById("delete");
const acButton = document.getElementById("ac");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const subtractButton = document.getElementById("subtract");
const addButton = document.getElementById("add");
const equalButton = document.getElementById("equal");
//numbers variables
const zeroButton = document.getElementById("zero");
const oneButton = document.getElementById("one");
const twoButton = document.getElementById("two");
const threeButton = document.getElementById("three");
const fourButton = document.getElementById("four");
const fiveButton = document.getElementById("five");
const sixButton = document.getElementById("six");
const sevenButton = document.getElementById("seven");
const eightButton = document.getElementById("eight");
const nineButton = document.getElementById("nine");

//func VARIABLES
let numOne = 0;
let numTwo;
let operator;

//show number on screen
screen.textContent = numOne;
//get fist number

//EVENT Listeners
const functionButtons = document.querySelectorAll(".function");
functionButtons.forEach((button) =>
  button.addEventListener("click", (x) => x + 1)
);
//num event listeners
//this gets the button value +???Button.innerText

//PHASE 1 Receive num and show it on screen
//On button press store num1 in variable
//show num on screen
//on second button press if type == num add it to num1 as a string (2 -> 1 = 21 not 3)
//show new num on screen
//repeat for every new num
