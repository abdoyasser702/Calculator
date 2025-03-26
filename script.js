const activeToggle = document.querySelector(".themes__toggle");

// Activation of the theme
const toggleActivationTheme = () =>
  activeToggle.classList.toggle("themes__toggle--isActive");

activeToggle.addEventListener("click", toggleActivationTheme);

activeToggle.addEventListener(
  "keydown",
  (event) => event.key === "Enter" && toggleActivationTheme()
);

// End the Activation of the theme

//Add numbers to the screen

const resultElement = document.querySelector(".calc__result");
const keysElements = document.querySelectorAll("[data-type]");

let currentNumber = "";
let storedNumber = "";
let operation = "";

const updateScreen = (value) => {
  resultElement.innerText = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;

  currentNumber += value;
  updateScreen(currentNumber);
};
//Reset
const resetButtonHandler = () => {
  currentNumber = "";
  storedNumber = "";
  operation = "";
  updateScreen(currentNumber);
};
//Delete
const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === "0") {
    return;
  } else if (currentNumber.length === 1) {
    currentNumber = "";
  } else if (currentNumber.length > 1) {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateScreen(currentNumber);
};
//Operation
const operationButtonHandler = (operationValue) => {
  if (!storedNumber && !currentNumber) {
    return;
  }
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  }
  if (storedNumber) {
    operation = operationValue;

    if (currentNumber) executeOperation();
  }
};
//Execute
const executeOperation = () => {
  if (currentNumber && storedNumber && operation) {
    switch (operation) {
      case "+":
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
        break;
      case "-":
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
        break;
      case "*":
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
        break;
      case "/":
        storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
        break;
    }
    currentNumber = "";
    updateScreen(storedNumber);
  }
};
const keyButtonHandler = (key) => {
  const type = key.dataset.type;
  key.addEventListener("click", () => {
    if (type === "number") {
      numberButtonHandler(key.dataset.value);
    } else if (type === "operation") {
      switch (key.dataset.value) {
        case "c": {
          resetButtonHandler();
          break;
        }
        case "Backspace": {
          deleteButtonHandler();
          break;
        }
        case "Enter": {
          executeOperation();
          break;
        }
        default: {
          operationButtonHandler(key.dataset.value);
        }
      }
    }
  });
};
keysElements.forEach(keyButtonHandler);

//Use keyboard to type
const availableNumbers = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  ".",
];
const availableOperations = ["+", "-", "*", "/"];
const availableKeys = [
  ...availableNumbers,
  ...availableOperations,
  "Backspace",
  "Enter",
  "c",
];
window.addEventListener("keydown", (event) => {
  // keyboardWithoutHover(event.key);
  keyboardWithHover(event.key);
});

//keyboardWithoutHover
const keyboardWithoutHover = (key) => {
  if (availableNumbers.includes(key)) {
    numberButtonHandler(key);
  } else if (availableOperations.includes(key)) {
    operationButtonHandler(key);
  } else if (key === "Backspace") {
    deleteButtonHandler();
  } else if (key === "Enter") {
    executeOperation();
  } else if (key === "c") {
    resetButtonHandler();
  }
};
//keyboardWithHover
const keyboardWithHover = (key) => {
  if (availableKeys.includes(key)) {
    const element = document.querySelector(`[data-value="${key}"]`);

    element.classList.add("hover");
    element.click();
    setTimeout(() => element.classList.remove("hover"), 100);
  }
};
