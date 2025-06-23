//MATH FUNCTIONS
//add
function add(x, y) {
  console.log(parseFloat(x) + parseFloat(y));
  return parseFloat(x) + parseFloat(y);
}
//subtract
function subtract(x, y) {
  console.log(parseFloat(x) - parseFloat(y));
  return parseFloat(x) - parseFloat(y);
}
//multiplication
function multiply(x, y) {
  console.log(parseFloat(x) * parseFloat(y));
  return parseFloat(x) * parseFloat(y);
}
//division
function divide(x, y) {
  if (y == 0) return "ERROR";
  console.log(parseFloat(x) / parseFloat(y));
  return parseFloat(x) / parseFloat(y);
}

//CALC. FUNCTION
function operate(num1, num2, operator) {
  let result;
  if (operator == "+") {
    result = add(num1, num2);
  } else if (operator == "-") {
    result = subtract(num1, num2);
  } else if (operator == "*") {
    result = multiply(num1, num2);
  } else if (operator == "/") {
    result = divide(num1, num2);
  }
  if (result == "ERROR") {
    alert("Can't divide by 0!");
    acButtonPress();
  } else {
    result = +result.toFixed(4);
    if (result.toString().length > 12) {
      result = result.toExponential(6);
    }
    operation.firstNum = Array.from(String(result));
    operation.secondNum = [];
    operation.operator = "";
    updateScreen();
  }
}

//DOC VARIABLES
const screen = document.getElementById("screen");
//buttons variables
const mathButtons = document.querySelectorAll(".math");
const deleteButton = document.getElementById("delete");
const acButton = document.getElementById("ac");
const equalButton = document.getElementById("equal");
//numbers variables
const pointButton = document.getElementById("point");
const numButtons = document.querySelectorAll(".number");

//func VARIABLES
let operation = {
  firstNum: [0],
  secondNum: [],
  operator: "",
  currentButtonPress: "",
};

//BUTTONS Functions
//listens to button click and updates nums accordingly
function numButtonPress(x) {
  /* resets the machine if last button was "=" */
  if (operation.currentButtonPress == "=") operation.firstNum = [0];
  operation.currentButtonPress = x.target.innerText;
  /* regex is used to test if "." has already been used */
  const regex = /[.]/g;
  /* if no operator input add value to firstNum */
  if (operation.operator == "") {
    /* test if firstNum has a . */
    if (regex.test(operation.firstNum) && operation.currentButtonPress == ".")
      return;
    /* sub 0 with the first number press */
    if (operation.firstNum[0] === 0 && operation.currentButtonPress != ".") {
      operation.firstNum.splice(0, 1);
    }
    operation.firstNum.push(operation.currentButtonPress);
    /* if operator is input add value to secondNum */
  } else if (
    /* test if secondNum has a . to not insert . multiple times*/
    regex.test(operation.secondNum) &&
    operation.currentButtonPress == "."
  ) {
    return;
  } else {
    /* sub 0 with the first number press */
    if (
      operation.secondNum[0] === 0 &&
      operation.currentButtonPress != "." &&
      operation.secondNum[1] != "."
    ) {
      operation.secondNum.splice(0, 1);
    } else if (
      operation.secondNum == "" &&
      operation.currentButtonPress == "."
    ) {
      operation.secondNum = [0];
    }
    operation.secondNum.push(operation.currentButtonPress);
  }

  updateScreen();
}

function mathButtonPress(x) {
  /*   if num 1 and num 2 populated operate()
  combined with second part gives result by pressing operator after num1 and 2 are populated*/
  if (operation.secondNum != "") {
    operate(
      operation.firstNum.join(""),
      operation.secondNum.join(""),
      operation.operator
    );
  }
  /* add operator input based on button pressed */
  const regex = /[+-]/g;
  if (regex.test(x.target.innerText)) {
    operation.currentButtonPress = x.target.innerText;
    operation.operator = x.target.innerText;
  } else if (x.target.innerText == "÷") {
    operation.currentButtonPress = "/";
    operation.operator = "/";
  } else if (x.target.innerText == "x") {
    operation.currentButtonPress = "*";
    operation.operator = "*";
  } else if (x.target.innerText == "=") {
    /* used to reset the machine by pressing a number after a result */
    operation.currentButtonPress = "=";
  }
}

function acButtonPress() {
  operation.firstNum = [0];
  operation.secondNum = [];
  operation.operator = "";
  updateScreen();
}

function delButtonPress() {
  if (operation.secondNum == "" && operation.firstNum != 0) {
    operation.firstNum.pop();
    if (operation.firstNum == "") operation.firstNum = [0];
    updateScreen();
  } else if (operation.secondNum != 0) {
    operation.secondNum.pop();
    if (operation.secondNum == "") operation.secondNum = [0];

    updateScreen();
  }
}

//show number on screen
function updateScreen() {
  const regex = /[/%*+-.=]/g;
  if (!regex.test(operation.operator)) {
    screen.textContent = operation.firstNum.join("");
  } else screen.textContent = operation.secondNum.join("");
  /* if number is too big automatically scroll */
  screen.scrollLeft = screen.scrollWidth;
}

//EVENT Listeners
numButtons.forEach((element) => {
  element.addEventListener("click", numButtonPress);
});
mathButtons.forEach((element) => {
  element.addEventListener("click", mathButtonPress);
});
acButton.addEventListener("click", acButtonPress);
deleteButton.addEventListener("click", delButtonPress);
//num event listeners
//this gets the button value +???Button.innerText

//PHASE 1 Receive num and show it on screen
//On button press store num1 in variable
//show num on screen
//on second button press if type == num add it to num1 as a string (2 -> 1 = 21 not 3)
//show new num on screen
//repeat for every new num
