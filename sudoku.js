

const display = document.getElementById('display');
const solve = document.getElementById('solve-button');
const solutionDisplay = document.getElementById('solution');

const squares = 81;
const submission = [];

for (let i = 0; i <squares; i++) {
  const inputElement = document.createElement('input');
  inputElement.setAttribute('type', 'number');
  inputElement.setAttribute('min', '1');
  inputElement.setAttribute('max', '9');
  if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    inputElement.classList.add('odd-section')
  }
  display.appendChild(inputElement);
}

const joinValues = () => {
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    if(input.value) {
      submission.push(input.value)
    } else {
      submission.push('.')
    }
  })
  console.log(submission);
}

joinValues()
const data = submission.join('');
console.log('data', data);

const populateValues = (isSolvable, solution) => {
  const inputs = document.querySelectorAll('input');
  if (isSolvable && solution){
    inputs.forEach( (input, i) => {
        input.value = solution[i]
    })
    solutionDisplay.innerHTML = 'This is the answer!'
  } else {
    solutionDisplay.innerHTML = 'This is NOT SOLVABLE.'
  }
}

const solved = () => {
  
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'EDIT HERE',
      'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
    },
    body: JSON.stringify({puzzle: data})
  };

  fetch('https://solve-sudoku.p.rapidapi.com/', options)
    .then(response => response.json())
    .then(response => populateValues(response.solvable, response.solution))
    .catch(err => console.error(err));

}



solve.addEventListener('click', solved)


