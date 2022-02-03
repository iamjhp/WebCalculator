const screenInput = document.querySelector('.input')
const numButtons = document.querySelectorAll('.num-btn')
const opButtons = document.querySelectorAll('.op-btn')
const eqButton = document.getElementById('equal')

let oldNumber = ''
let newNumber = ''
let operator = ''
let opBoolean = false

numButtons.forEach(button => button.addEventListener("click", () => appendNumber(button.textContent)))
opButtons.forEach(button => button.addEventListener("click", () => setOperator(button)))
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

function setOperator (button) {
    calculateValue()
    operator = button.id
}

function calculateValue () {
    if (oldNumber && newNumber) {
        oldNumber = operate(operator, oldNumber, newNumber)
        console.log(oldNumber)
    } else {
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

function test () {
    console.log(currNumber)
}