const displayValue = document.querySelector('.value')
const numButtons = document.querySelectorAll('.num-btn')

let currNumber = ''
let newNumber = ''

numButtons.forEach(button => button.addEventListener("click", () => {
    displayValue.textContent = appendNumber(button.textContent)
    console.log(typeof button.textContent)
}))

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

function appendNumber (num) {
    currNumber += num
    return currNumber
}