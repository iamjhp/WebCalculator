const screenInput = document.querySelector('.input')
const screenHistory = document.querySelector('.history')
const numButtons = document.querySelectorAll('.num-btn')
const arithOpButtons = document.querySelectorAll('.op-btn')
const otherOpButtons = document.querySelectorAll('.op-btn2')
const eqButton = document.getElementById('equal')
const clearButton = document.getElementById('clear')
const deleteButton = document.getElementById('delete')
const dotButton = document.getElementById('dot')
const negButton = document.getElementById('negate')

let firstNumber = ''
let secondNumber = ''
let firstNumberString = ''
let secondNumberString = ''
let result = 0
let newOperator = ''
let oldOperator = ''
let endOfCalcBool = false
let otherOpBool = false
let errorBool = false
let errorMessage = ''

numButtons.forEach(button => button.addEventListener("click", () => {
    if (endOfCalcBool || (otherOpBool && !newOperator)) {
        doNewCalculation()
    }
    appendNumber(button.textContent)
}))

otherOpButtons.forEach(button => button.addEventListener("click", () => {
    secondNumber = operateOtherOp(button.id)
    displayValue(secondNumber)
    if (errorBool) {
        doNewCalculation()
    } else {
        displayHistory(false, true)
    }
}))

arithOpButtons.forEach(button => button.addEventListener("click", () => {
    setOperator(button)
    calculateValue(true)
    displayHistory()
}))

eqButton.addEventListener("click", () => {
    calculateValue(false, true)
    if (errorBool) {
        doNewCalculation()
    } else {
        displayHistory(true)
    }
})

clearButton.addEventListener("click", () => clearCalculator())
deleteButton.addEventListener("click", () => deleteDigitOfInput())
dotButton.addEventListener("click", () => putDotInNumber())
negButton.addEventListener("click", () => negateNum())

function negateNum () {
    if (endOfCalcBool) {
        doNewCalculationWithOldResult()
    } else {
        putFirstNumberIntoSecondNumber()
    }
    
    secondNumber = (secondNumber == 0) ? 0 : secondNumber * (-1)
    displayValue(secondNumber)
}

function putDotInNumber () {
    if (endOfCalcBool) {
        clearCalculator()
        secondNumber = "0"
    } else {
        secondNumber = secondNumber.toString()
    }

    if (!secondNumber.includes('.')) {
        if (secondNumber) {
            secondNumber += "."
        } else {
            secondNumber += "0."
        }
    }
    displayValue(secondNumber)
}

function changeSecondNumberToNumber () {
    secondNumber = Number(secondNumber)
}

function appendNumber (num) {
    if (secondNumber == 0 && secondNumber !== '0.') {
        secondNumber = num
    } else {
        if (!limitLengthOfAnInput(secondNumber)) {
            secondNumber += num
        }
    }
    displayValue(secondNumber)
}

function displayValue (num) {
    screenInput.textContent = num
}

// Clear the value display and wipe out all existing data
function clearCalculator () {
    displayValue(0)
    doNewCalculation()
}

function deleteDigitOfInput () {
    if (!endOfCalcBool) {
        secondNumber = secondNumber?.slice?.(0, -1)
        if (!secondNumber) {
            secondNumber = 0
        }
        displayValue(secondNumber)
    }
}

function setOperator (button) {
    if (oldOperator && newOperator) {
        oldOperator = newOperator
    } else {
        oldOperator = button.id
    }
    newOperator = button.id
}

// Check to see if the first or second numbers are pressed and calculate the (immediate) value
function calculateValue (opButton = false, eqButton = false) {
    endOfCalcBool = false
    changeSecondNumberToNumber()
    displayValue(secondNumber)
    if (firstNumber !== '' && secondNumber !== '' && eqButton && newOperator) {
        // both Numbers not empty and equal Button is pressed
        result = operateArith(newOperator, firstNumber, secondNumber)
        if (typeof(result) === 'number') {
            result = roundNumber(result)
            firstNumberString = (firstNumberString) ? firstNumberString : firstNumber
            secondNumberString = (secondNumberString) ? secondNumberString : secondNumber
            displayValue(result)

        } else {
            displayValue(result)
        }
        endOfCalcBool = true

    } else if (firstNumber === '' && secondNumber !== '' && opButton){
        // only one number is entered and then operation button is pressed e.g. (5 + ) 
        firstNumber = secondNumber
        firstNumberString = (secondNumberString) ? secondNumberString : secondNumber
        clearSecondNumber()
    } else if (firstNumber !== '' && secondNumber !== '' && opButton) {
        // both numbers with an operation are entered and a new operation button is pressed e.g. (5 - 3 +)
        firstNumber = operateArith(oldOperator, firstNumber, secondNumber)
        firstNumber = roundNumber(firstNumber)
        displayValue(firstNumber)
        clearSecondNumber()
        firstNumberString = firstNumber
    } else if (firstNumber === '' && secondNumber !== '' && eqButton) {
        // Equal button is pressed with only secondNumber
        displayValue(secondNumber)
        result = secondNumber
        secondNumberString = (secondNumberString) ? secondNumberString : secondNumber
        endOfCalcBool = true
    } else if (firstNumber !== '' && secondNumber === '' && eqButton) {
        // Equal button is pressed with only firstNumber
        result = firstNumber
        endOfCalcBool = true
    } else {
        setFirstNumber()
    }

}

// Set the values to initial states for a new calculation
function doNewCalculation () {
    clearFirstNumber()
    clearSecondNumber()
    clearOperator()
    clearHisotry()
    result = ''
    endOfCalcBool = false
    otherOpBool = false
    errorMessage = ''
    errorBool = false
}

function clearFirstNumber () {
    firstNumber = ''
    firstNumberString = ''
}

function clearSecondNumber () {
    secondNumber = ''
    secondNumberString = ''
}

function clearOperator () {
    newOperator = ''
    oldOperator = ''
}

function clearHisotry () {
    screenHistory.textContent = ""
}

// Check to see if the firstNumber is empty and set zero if firstNumber is empty.
function setFirstNumber () {
    if (!firstNumber) {
        firstNumber = 0
        firstNumberString = 0
    }
}

function add (a, b) {
    return a + b
}

function sub (a, b) {
    return a - b
}

function mult (a, b) {
    return a * b
}

function div (a, b) {
    return a / b
}

function square (a) {
    return a * a
}

function squareRoot (a) {
    return Math.sqrt(a)
}

function oneDivideByNum (a) {
    return 1/a
}

// Returns the calculated value or operation symbol for display history
function operateArith (op, num1, num2) {
    let res
    num1 = Number(num1)
    num2 = Number(num2)

    switch (op) {
        case "plus":
            res = (!isNaN(num1)) ? add(num1, num2) : "+"
            break
        case "minus":
            res = (!isNaN(num1)) ? sub(num1, num2) : "-"
            break
        case "multiply":
            res = (!isNaN(num1)) ? mult(num1, num2) : '×'
            break
        case "divide":
            setErrorMessageForDiv(num2)
            if (errorBool) {
                return errorMessage
            }
            res = (!isNaN(num1)) ? div(num1, num2) : "÷"
            break
        default:
            res = null
    }
    return res
}

function operateOtherOp (op) {
    doNewCalculationWithOldResult()
    otherOpBool = true
    putFirstNumberIntoSecondNumber()
    if (secondNumber === '') secondNumber = 0
    switch (op) {
        case "square":
            secondNumberString = secondNumber + "\u00B2"
            return roundNumber(square(secondNumber))
        case "oneDivX":
            setErrorMessageForDiv(Number(secondNumber))
            if (errorBool) {
                return errorMessage
            }
            secondNumberString = "1/" + secondNumber 
            return roundNumber(oneDivideByNum(secondNumber))
        case "root":
            setErrorMessageForRoot(Number(secondNumber))
            if (errorBool) {
                return errorMessage
            }
            secondNumberString = "√" + secondNumber
            return roundNumber(squareRoot(secondNumber))
        default :
            return ""
    }
}

function putFirstNumberIntoSecondNumber () {
    if (secondNumber === '') secondNumber = firstNumber
}

function doNewCalculationWithOldResult () {
    let tmp = result
    if (endOfCalcBool) {
        doNewCalculation()
        secondNumber = tmp
    }
}

// Display the history with the enterened numbers and operators
function displayHistory (eqButton = false, otherOpButton = false) {
    let operatorSymbol = operateArith(newOperator)
    secondNumberString = secondNumberString.toString()
    if (eqButton) {
        if (firstNumber !== '' && secondNumber !== '' && operatorSymbol !== '') {
            screenHistory.textContent = firstNumberString + " " + operatorSymbol + " " + secondNumberString + " = "
        } else {
            // Operator button is pressed without two numbers
            newOperator = ''
            screenHistory.textContent = (secondNumber || secondNumber === 0) ? secondNumberString + " =" : firstNumberString + " ="
        }
    } else {
        if (otherOpButton) {
            if (firstNumber !== '' && !endOfCalcBool) {
                screenHistory.textContent = firstNumberString + " " + operatorSymbol + " " + secondNumberString
            } else {
                screenHistory.textContent = secondNumberString
            }
        } else {
            screenHistory.textContent = firstNumberString + " " + operatorSymbol
        }
    }
}

function roundNumber(num) {
    let numberOfDecimal = 1000000000000
    num = num * numberOfDecimal
    num = Math.round(num) / numberOfDecimal
    return num
}

function limitLengthOfAnInput(num) {
    num = num.toString()
    if (num.length == 12) {
        return true
    }

    return false
}

function setError (){
    endOfCalcBool = true
    errorBool = true
}
function checkErrorForDiv (num) {
    if (num === 0) {
        setError()
        return true
    }
    return false
}

function checkErrorForRoot (num) {
    if (num < 0) {
        setError()
        return true
    }
    return false
}

function setErrorMessageForDiv (num) {
    if (checkErrorForDiv(num)) {
        errorMessage = 'Divide by 0 not possible'
    }
}

function setErrorMessageForRoot (num) {
    if (checkErrorForRoot(num)) {
        errorMessage = "Invalid input"
    }

}