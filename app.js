class Calculator {
    constructor(prevOpTxtEle, currOpTxtEle) {
        this.prevOpTxtEle = prevOpTxtEle;
        this.currOpTxtEle = currOpTxtEle;
        this.clear()
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    del() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNum(num) {
        if (num === "." && this.currentOperand.includes(".")) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + num.toString();
    }

    chooseOp(operation) {
        if (this.currentOperand === "") {
            return;
        }
        if (this.previousOperand !== "") {
            this.operate();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    operate() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(curr)) {
            return;
        }
        switch (this.operation) {
            case "+":
                computation = prev + curr;
                break;
            case "-":
                computation = prev - curr;
                break;
            case "*":
                computation = prev * curr;
                break;
            case "/":
                computation = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }


    getDisplayNum(num) {
        const stringNum = num.toString();
        const integerDigit = parseFloat(stringNum.split(".")[0])
        const decimalDigit = stringNum.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigit)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigit.toLocaleString("en", {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigit != null) {
            return `${integerDisplay}.${decimalDigit}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currOpTxtEle.innerText = this.getDisplayNum(this.currentOperand);
        if (this.operation != null) {
            this.prevOpTxtEle.innerText = `${this.previousOperand} ${this.operation}`;
        } else {
            this.prevOpTxtEle.innerText = "";
        }
        
    }

}

const numberButtons = document.querySelectorAll("[data-number");
const operationButtons = document.querySelectorAll("[data-operation");
const equalsButton = document.querySelector("[data-equals]");
const delButton = document.querySelector("[data-del");
const allClearButton = document.querySelector("[data-all-clear");
const prevOpTxtEle = document.querySelector("[data-prev-op]");
const currOpTxtEle = document.querySelector("[data-curr-op]");

const calc = new Calculator(prevOpTxtEle, currOpTxtEle);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calc.appendNum(button.innerText);
        calc.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calc.chooseOp(button.innerText);
        calc.updateDisplay();
    })
})

equalsButton.addEventListener("click", button => {
    calc.operate();
    calc.updateDisplay();
})

allClearButton.addEventListener("click", button => {
    calc.clear();
    calc.updateDisplay();
})

delButton.addEventListener("click", button => {
    calc.del();
    calc.updateDisplay();
})