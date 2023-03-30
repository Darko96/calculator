const previousOperand = document.querySelector(".previous-operand");
const currentOperand = document.querySelector(".current-operand");
const deleteBtn = document.querySelector(".delete-btn");
const resetBtn = document.querySelector(".reset-btn");
const outputBtn = document.querySelector(".output-btn");
const numBtns = document.querySelectorAll(".num-btn");
const operators = document.querySelectorAll(".operator-btn");
let prevOperand = previousOperand.innerText;
let currOperand = currentOperand.innerText;
let theme1 = document.getElementById("theme1");
let theme2 = document.getElementById("theme2");
let theme3 = document.getElementById("theme3");
let operation;

// Event listeners for chaning themes
theme1.addEventListener("click", () => {
  document.documentElement.classList.remove("theme2");
  document.documentElement.classList.remove("theme3");
});

theme2.addEventListener("click", () => {
  document.documentElement.classList.remove("theme1");
  document.documentElement.classList.remove("theme3");
  document.documentElement.classList.toggle("theme2");
});

theme3.addEventListener("click", () => {
  document.documentElement.classList.remove("theme1");
  document.documentElement.classList.remove("theme2");
  document.documentElement.classList.toggle("theme3");
});

// Reset function
function reset() {
  prevOperand = "";
  currOperand = "";
  operation = undefined;
}

// Delete function
function deleteOperand() {
  currOperand = currOperand.toString().slice(0, -1);
}

// add number function
function addNumber(number) {
  if (number == "." && currOperand.includes(".")) return;
  if (currOperand.length < 10) {
    currOperand = currOperand.toString() + number.toString();
  }
}

// Selecting operation function
function operationSelection(operate) {
  if (operate == "") return;
  if (operate !== "") {
    calculatorOperation();
  }
  operation = operate;
  prevOperand = currOperand;
  currOperand = "";
}

// Calculate numbers function
function calculatorOperation() {
  let result;
  let prev = parseFloat(prevOperand);
  let current = parseFloat(currOperand);

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "x":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  if (result % 1 !== 0 && result.toString().split(".")[1].length > 2) {
    currOperand = parseFloat(result.toFixed(2));
  } else {
    currOperand = result;
  }

  operation = undefined;
  prevOperand = "";
  previousOperand.innerHTML = "";
}

// Display numbers function
function displayNum() {
  currentOperand.innerHTML = currOperand.toString();
  if (operation !== undefined) {
    previousOperand.innerHTML = `${prevOperand} ${operation}`;
  } else {
    previousOperand.innerHTML = prevOperand;
  }
}

// Event listeners for numbers, operators, output, delete and reset buttons
numBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addNumber(btn.innerHTML);
    displayNum();
  });
});

operators.forEach((btn) => {
  btn.addEventListener("click", () => {
    operationSelection(btn.innerHTML);
    displayNum();
  });
});

outputBtn.addEventListener("click", () => {
  calculatorOperation();
  displayNum();
});

deleteBtn.addEventListener("click", () => {
  deleteOperand();
  displayNum();
});

resetBtn.addEventListener("click", () => {
  reset();
  displayNum();
});
