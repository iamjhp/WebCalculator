const screenInput = document.querySelector('.input')
const screenHistory = document.querySelector('.history')
const numButtons = document.querySelectorAll('.num-btn')
const opButtons = document.querySelectorAll('.op-btn')
const eqButton = document.getElementById('equal')

let oldNumber = '0'
let newNumber = ''
let newOperator = ''
let oldOperator = ''
let opBoolean = false

numButtons.forEach(button => button.addEventListener("click", () => appendNumber(button.textContent)))
opButtons.forEach(button => button.addEventListener("click", () => {
    setOperator(button)
    calculateValue()
    displayHistory()
}))
eqButton.addEventListener("click", () => {
    calculateValue()
})

function appendNumber (num) {
    newNumber += num
    displayValue(newNumber)
}

function displayValue (num) {
    screenInput.textContent = num
}

function displayHistory () {
    let operatorSymbol = ''
    switch (newOperator) {
        case "plus":
            operatorSymbol = "+"
            break
        case "minus":
            operatorSymbol = "-"
            break
        case "multiply":
            operatorSymbol = '×'
            break
        case "divide":
            operatorSymbol = "÷"
            break
    }
    
    screenHistory.textContent = oldNumber + " " + operatorSymbol
}

function setOperator (button) {
    if (oldOperator) {
        oldOperator = newOperator
    } else {
        oldOperator = button.id
    }
    newOperator = button.id
}

// Check to see if the first and second numbers are pressed and calculate the immediate value
function calculateValue () {
    console.log(oldNumber + " " + newNumber + " " + oldOperator)
    if (oldNumber && newNumber) {
        oldNumber = operate(oldOperator, oldNumber, newNumber)
        displayValue(oldNumber)
    } else {
        // First number (oldNumber) is empty
        setOldNumber()
    }
    newNumber = ''
}

// Set oldNumber to newNumber if only oldNumber is empty 
function setOldNumber () {
    if (!oldNumber) {
        oldNumber = newNumber
    }
}

function add(a, b) {
    return a + b
}

function sub(a, b) {
    return a - b
}

function mult(a, b) {
    return a * b
}

function div(a, b) {
    return a / b
}

function operate (operator, num1, num2) {
    let res
    num1 = Number(num1)
    num2 = Number(num2)
    switch (operator) {
        case "plus":
            res = add(num1, num2)
            break
        case "minus":
            res = sub(num1, num2)
            console.log(res)
            break
        case "multiply":
            res = mult(num1, num2)
            break
        case "divide":
            res = div(num1, num2)
            break
        default:
            res = null
    }
    return res
}