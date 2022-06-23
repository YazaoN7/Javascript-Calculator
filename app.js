// Currently calculator is buggy. It only accepts one number after hitting an operator key



// grab the necessary DOM elements
const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calc-keys");
const display = document.querySelector(".calc-display");

// take an operator and numbers then perform the correct operation
function operate(x, operator, y) {
    let result = "";
    
    if (operator == "addition") {
        result = parseFloat(x) + parseFloat(y);
    } else if (operator == "subtract") {
        result = parseFloat(x) - parseFloat(y);
    } else if (operator == "multiply") {
        result = parseFloat(x) * parseFloat(y);
    } else if (operator == "divide") {
        result = parseFloat(x) / parseFloat(y);
    }

    return result;
}


keys.addEventListener("click", e => {
    if (e.target.matches("button")) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType

        // if key doesn't have action then it is a number key.
        if (!action) {
            if (displayedNum === "0" || previousKeyType === "operator") {
                display.textContent = keyContent
                console.log("number key!");
                calculator.dataset.previousKey = "number"
            } else {
                display.textContent = displayedNum + keyContent;
            };
        }

        // if data-action is +, -, *, or / then it is an operator key
        if (
            action == "addition" ||
            action == "subtract" ||
            action == "multiply" ||
            action == "divide"
        ) {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator
            const secondValue = displayedNum;
            
            if (firstValue && operator && previousKeyType !== "operator") {
                display.textContent = operate(firstValue, operator, secondValue);
                display.textContent = calcValue;

                calculator.dataset.firstValue = calcValue;
            } else {
                calculator.dataset.firstValue = displayedNum;
            }

            key.classList.add("is-depressed");
            console.log("operator key");
            // add custom attribute
            calculator.dataset.previousKeyType = "operator";
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;        
        }
        
        if (action === "decimal") {
            if (!displayedNum.includes(".")) {
                display.textContent = displayedNum + ".";
            } else if (previousKeyType === "operator") {
                display.textContent = "0"
            }
            
            calculator.dataset.previousKey = "decimal";
        }

        if (action === "clear") {
            console.log("clear key");
            calculator.dataset.previousKeyType = "clear"
        }

        if (action === "calculate") {
            console.log("equals key");
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum;

            if (firstValue) {
                display.textContent = operate(firstValue, operator, secondValue);
            }

            calculator.dataset.previousKeyType = "calculate";
        }

        
        // remove .is-depressed class from all keys
        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove("is-depressed"));
    }
})