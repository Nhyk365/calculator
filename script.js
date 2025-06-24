//DOC VARIABLES
const screen = document.getElementById("screen");
const calculator = document.getElementById("calculator");
//buttons variables
const mathButtons = document.querySelectorAll(".math");
const deleteButton = document.getElementById("delete");
const acButton = document.getElementById("ac");
const equalButton = document.getElementById("equal");
const addButton = document.getElementById("add");
const minusButton = document.getElementById("subtract");
const multiplyButton = document.getElementById("multiply");
const divideButton = document.getElementById("divide");
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
//MATH FUNCTIONS
//add
function add(x, y) {
  return parseFloat(x) + parseFloat(y);
}
//subtract
function subtract(x, y) {
  return parseFloat(x) - parseFloat(y);
}
//multiplication
function multiply(x, y) {
  return parseFloat(x) * parseFloat(y);
}
//division
function divide(x, y) {
  if (y == 0) return "ERROR";
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
    /* if result is too big we use scientific notation and round decimals */
    result = +result.toFixed(4);
    if (result.toString().length > 12) {
      result = result.toExponential(6);
    }
    operation.firstNum = Array.from(String(result));
    operation.secondNum = [];
    operation.operator = "";
    updateScreen();
    mathButtonColor();
  }
}

//BUTTONS Functions
//listens to button click and updates nums accordingly
function numButtonPress(x) {
  /* check if value comes from keyboard or button */
  if (x.type == "keydown") {
    /* resets the machine if last button was "=" */
    if (operation.currentButtonPress == "=") operation.firstNum = [0];
    operation.currentButtonPress = x.key;
  } else if (x.type == "click") {
    /* resets the machine if last button was "=" */
    if (operation.currentButtonPress == "=") operation.firstNum = [0];
    operation.currentButtonPress = x.target.innerText;
  }

  /* regex is used to test if "." has already been used */
  const regex = /[.]/g;
  /* if no operator input add value to firstNum */
  if (operation.operator == "") {
    /* test if firstNum has a . */
    if (regex.test(operation.firstNum) && operation.currentButtonPress == ".")
      return;
    /* sub 0 with the first number press */
    if (
      operation.firstNum[0] === 0 &&
      operation.currentButtonPress != "." &&
      operation.firstNum[1] != "."
    ) {
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
  x.target.blur();
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
  /* check if button or keyboard is used */
  if (x.type == "click") {
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
  } else if (x.type == "keydown") {
    /* Can use Enter has = button */
    if (x.key == "Enter") {
      operation.currentButtonPress = "=";
    } else {
      operation.currentButtonPress = x.key;
      if (x.key != "=") operation.operator = x.key;
    }
  }
  mathButtonColor();
  x.target.blur();
}

function acButtonPress(x) {
  operation.firstNum = [0];
  operation.secondNum = [];
  operation.operator = "";
  x.target.blur();
  mathButtonColor();

  updateScreen();
}

function delButtonPress(x) {
  if (/[-/*+.=]/g.test(operation.currentButtonPress)) {
    operation.operator = "";
  } else if (operation.secondNum == "" && operation.firstNum != 0) {
    operation.firstNum.pop();
    if (operation.firstNum == "") operation.firstNum = [0];
  } else if (operation.secondNum != 0) {
    operation.secondNum.pop();
    if (operation.secondNum == "") operation.secondNum = [0];
  }
  x.target.blur();
  mathButtonColor();
  updateScreen();
}

//show number on screen
function updateScreen() {
  const regex = /[-/*+.=]/g;
  if (!regex.test(operation.operator) || operation.secondNum == "") {
    screen.textContent = operation.firstNum.join("");
  } else screen.textContent = operation.secondNum.join("");
  /* if number is too big automatically scroll */
  screen.scrollLeft = screen.scrollWidth;
}

//color current operator button
function mathButtonColor() {
  if (operation.operator == "+") {
    addButton.style.backgroundColor = "#FFD9A3";
  } else if (operation.operator == "-") {
    minusButton.style.backgroundColor = "#FFD9A3";
  } else if (operation.operator == "*") {
    multiplyButton.style.backgroundColor = "#FFD9A3";
  } else if (operation.operator == "/") {
    divideButton.style.backgroundColor = "#FFD9A3";
  } else if (operation.operator == "") {
    addButton.style.backgroundColor = "";
    minusButton.style.backgroundColor = "";
    multiplyButton.style.backgroundColor = "";
    divideButton.style.backgroundColor = "";
  }
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

//review this
/* addEventListener("keydown", numButtonPress);*/
document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (/[1234567890\.]/g.test(event.key) && !/F/g.test(event.key))
    numButtonPress(event);
  if (/[-+=*\/]/.test(event.key) || event.key == "Enter")
    mathButtonPress(event);
});
