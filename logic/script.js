let numbers = []
let currentNumber = ''
let lastOperation = ''
let historyCalc = ''
let result
let elementDisplayResult = document.querySelector('.element-display-result')
let elementDisplayCalc = document.querySelector('.element-display-calc')
let buttonClear = document.getElementById('clear')


function clearCalculator() {
  result = undefined
  buttonClear.textContent = 'AC'
  currentNumber = ''
  numbers = []
  historyCalc = ''
  elementDisplayCalc.textContent = ''
  elementDisplayResult.textContent = '0'
  removeClass()
}

function displayResult(numbers, currentNumber){
  if (numbers[1] || numbers[1] === 0) {
    elementDisplayResult.textContent = "= " + numbers[1]
  } else if (numbers[0]) {
    elementDisplayResult.textContent = "= " + numbers[0]
  } else if (!isNaN(currentNumber)) {
    elementDisplayResult.textContent = "= " + currentNumber
  }
}

function removeClass(){
  elementDisplayCalc.classList.remove("element-display-calc-total")
  elementDisplayResult.classList.remove("element-display-result-total")
}

function addClass(){
  elementDisplayCalc.classList.add("element-display-calc-total")
  elementDisplayResult.classList.add("element-display-result-total")
}

function calcs(operation, element){
  switch (operation) {
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
        minimumFractionDigits: 0,
        maximumFractionDigits: 7
      })
      break
  }
}



function calculate(element) {

  if (!isNaN(element) && numbers.length === 0) {
    removeClass()
    buttonClear.textContent = 'C'
    currentNumber += element
    historyCalc = currentNumber
  } else if (isNaN(element) && currentNumber.length === 0) {
    if(result !== undefined && element !== "."){
        removeClass()
        numbers[0] = Number(result)
        historyCalc = `${result}${element}` 
        lastOperation = element
    } else {
      return
    }
    
  } else if (isNaN(element) && numbers.length === 0 && element !== "=") {
      if(element === "."){
        const searchCharacter = currentNumber.includes(".")
        if(!searchCharacter){
          currentNumber += element
          historyCalc += element
        }
      } else if (element === "%"){
        currentNumber = currentNumber / 100
        historyCalc = currentNumber
      } else {
        numbers[0] = Number(currentNumber)
        currentNumber = ''
        historyCalc += element
        lastOperation = element
      }
    
  }

  if (isNaN(element) && numbers.length > 0) {
    if (element === "=" && numbers[1] !== undefined) {
      elementDisplayResult.textContent = "= " + numbers[1]
      currentNumber = ''
      addClass()
      result = numbers[1]
      numbers = []
      return
    }

    if(element === "." && numbers[1] !== undefined){
      const searchCharacter = currentNumber.includes(".")
      if(!searchCharacter){
        currentNumber += "."
        historyCalc += element
      }
    } else {
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
  }

  if (!isNaN(element) && numbers.length > 0) {
    historyCalc += element
    calcs(lastOperation, element)
  }

  displayResult(numbers, currentNumber)

  elementDisplayCalc.textContent = historyCalc

}