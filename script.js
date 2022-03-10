let numbers = []
let currentNumber = ''
let lastOperation = ''
let elementDisplayResult = document.querySelector('.element-display-result')
let elementDisplayCalc = document.querySelector('.element-display-calc')

function calculate(element) {

  if(!isNaN(element) && numbers.length === 0){
    currentNumber += element
  } else if (isNaN(element) && numbers.length === 0) {
    numbers[0] = Number(currentNumber)
    currentNumber = ''
    lastOperation = element
  }

  if(isNaN(element) && numbers.length > 0){
    if(element === "=" && numbers[1] !== undefined){
      elementDisplayResult.textContent = "= " + numbers[1]
      currentNumber = ''
      elementDisplayCalc.textContent = currentNumber
      numbers = []
      return
    }
    if(lastOperation !== element){
      lastOperation = element
      numbers[0] = numbers[1]
      currentNumber = ''
    } else if(lastOperation === element && numbers[1] !== undefined) {
      numbers[0] = numbers[1]
      currentNumber = ''
    }
  } 

  if(!isNaN(element) && numbers.length > 0){
    switch(lastOperation){
      case'+':
        currentNumber += element
        numbers[1] = numbers[0] + Number(currentNumber)
        break
      case'-':
        currentNumber += element
        numbers[1] = numbers[0] - Number(currentNumber)
        break
      case'*':
        currentNumber += element
        numbers[1] = numbers[0] * Number(currentNumber)
        break
      case'/':
        currentNumber += element
        numbers[1] =  (numbers[0] / Number(currentNumber)).toFixed(7)
        break
    }
  }
  
  elementDisplayCalc.textContent = currentNumber

  if(numbers[1] || numbers[1] === 0){
    elementDisplayResult.textContent = "= " + numbers[1]
  } else if(numbers[0]){
    elementDisplayResult.textContent = "= " + numbers[0]
  } else if(!isNaN(currentNumber)){
    elementDisplayResult.textContent = "= " + currentNumber
  }

   
}