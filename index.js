const express = require('express');
const fs = require('fs');

const rawdata = fs.readFileSync('prompts.json');
const prompts = JSON.parse(rawdata);
const app = express();
const port = 1337;

app.get('/prompts', (req, res) => {
  res.json(prompts);
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})