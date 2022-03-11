let numbers = []
let currentNumber = ''
let lastOperation = ''
let historyCalc = ''
let elementDisplayResult = document.querySelector('.element-display-result')
let elementDisplayCalc = document.querySelector('.element-display-calc')
let buttonClear = document.getElementById('clear')


function clearCalculator() {
  buttonClear.textContent = 'AC'
  currentNumber = ''
  numbers = []
  historyCalc = ''
  elementDisplayCalc.textContent = ''
  elementDisplayResult.textContent = '0'
  elementDisplayCalc.classList.remove("element-display-calc-total")
  elementDisplayResult.classList.remove("element-display-result-total")
}

function calculate(element) {

  if (!isNaN(element) && numbers.length === 0) {
    elementDisplayCalc.classList.remove("element-display-calc-total")
    elementDisplayResult.classList.remove("element-display-result-total")
    buttonClear.textContent = 'C'
    currentNumber += element
    historyCalc = currentNumber
  } else if (isNaN(element) && currentNumber.length === 0) {
    return
  } else if (isNaN(element) && numbers.length === 0 && element !== "=") {
    numbers[0] = Number(currentNumber)
    currentNumber = ''
    historyCalc += element
    lastOperation = element
  }

  if (isNaN(element) && numbers.length > 0) {
    if (element === "=" && numbers[1] !== undefined) {
      elementDisplayResult.textContent = "= " + numbers[1]
      currentNumber = ''
      elementDisplayCalc.classList.add("element-display-calc-total")
      elementDisplayResult.classList.add("element-display-result-total")
      numbers = []
      return
    }



    if (lastOperation !== element) {
      lastOperation = element
      numbers[0] = numbers[1]
      currentNumber = ''
      historyCalc += element
    } else if (lastOperation === element && numbers[1] !== undefined) {
      numbers[0] = numbers[1]
      currentNumber = ''
      historyCalc += element
    }
  }

  if (!isNaN(element) && numbers.length > 0) {
    historyCalc += element
    switch (lastOperation) {
      case '+':
        currentNumber += element
        numbers[1] = numbers[0] + Number(currentNumber)
        break
      case '-':
        currentNumber += element
        numbers[1] = numbers[0] - Number(currentNumber)
        break
      case '*':
        currentNumber += element
        numbers[1] = numbers[0] * Number(currentNumber)
        break
      case '/':
        currentNumber += element
        numbers[1] = (numbers[0] / Number(currentNumber)).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 7
        })
        break
    }
  }

  if (numbers[1] || numbers[1] === 0) {
    elementDisplayResult.textContent = "= " + numbers[1]
  } else if (numbers[0]) {
    elementDisplayResult.textContent = "= " + numbers[0]
  } else if (!isNaN(currentNumber)) {
    elementDisplayResult.textContent = "= " + currentNumber
  }

  elementDisplayCalc.textContent = historyCalc

}