const PORT = 3001
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())


app.post('/solve', (req,res) => {

  console.log(req.body)

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': 'process.env.X_RapidAPI_Key',
      'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
    },
    body: JSON.stringify({ puzzle: req.body.numbers })
  };

  fetch('https://solve-sudoku.p.rapidapi.com/', options)
    .then(response => response.json())
    .catch(err => console.error(err));


})


app.listen(PORT, () => console.log(`server listening on port ${PORT}`))




  // .then(response => populateValues(response.solvable, response.solution))