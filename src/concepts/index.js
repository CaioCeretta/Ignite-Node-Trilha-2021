const express = require('express');

const app = express();
app.use(express.json())

app.get('/courses', (req, res) => {
  return res.json(['Course 1', 'Course 2', 'Course 4']);
})

app.post('/courses', (req, res) => {
  const body = req.body;
  console.log(body);
  return res.json(['Course 1', 'Course 2', 'Course 3', 'Course 4']);
})

//Query params são opcionais, diferente dos route params, que caso não sejam passados irá gerar um erro
app.put('/courses/:id', (req, res) => {
  const params = req.params;
  console.log(params)
  return res.json(['Course 6', 'Course ', 'Course 3', 'Course 4']);

})

app.patch('/courses/:id', (req, res) => {
  return res.json(['Course 6', 'Course 7', 'Course 3', 'Course 4']);
})

app.delete('/courses/:id', (req, res) => {
  return res.json(['Course 6', 'Course 7', 'Course 4']);
})




app.listen(3333)