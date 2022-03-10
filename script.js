let calc = []

function operations(operation) {
  switch (operation) {
    case '%':
      console.log(2 * 2)
      break;
    case '/':
      console.log(2 / 2)
      break;
    case '*':
      console.log(2 * 2)
      break;
    case '-':
      console.log(2 - 2)
      break;
    case '+':
      console.log(2 + 2)
      break;
  }

  document.querySelector('.element-display').textContent = operation
}

