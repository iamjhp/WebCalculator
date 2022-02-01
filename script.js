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