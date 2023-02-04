const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(req, res, next) {
  const { username } = req.headers;

  const user = users.find(user => user.username === username);

  if(!user) {
    return res.status(404).json({message: 'No user was found with that id'});
  }

  req.user = user;

  next();
}

app.post('/users', (req, res) => {
  const { name, username } = req.body;
  const id = uuidv4();

  const usernameAlreadyBeenUsed = users.find(user => user.username === username);

  if(usernameAlreadyBeenUsed) {
    return res.status(400).json({error: 'This username is already been used'});
  }

  const user = {
    id,
    name,
    username,
    todos: []
  }

  users.push(user);

  return res.status(201).send(user);
});

app.get('/todos', checksExistsUserAccount, (req, res) => {
  const { user } = req;

  return res.status(200).json(user.todos);
});

app.post('/todos', checksExistsUserAccount, (req, res) => {
  const{ user } = req;
  const id = uuidv4();
  const { title, deadline } = req.body;

  const todo = {
    id,
    title,
    done: false,
    deadline: new Date(deadline),
    created_at: new Date()
  }

  user.todos.push(todo);

  return res.status(201).json(todo)

});

app.put('/todos/:id', checksExistsUserAccount, (req, res) => {
  const { user } = req;
  const { title, deadline } = req.body;
  const { id } = req.params;

  const foundToDoIdx = user.todos.findIndex(todo => todo.id === id);
  const foundToDo = user.todos.find(todo => todo.id === id);

  if(foundToDoIdx === -1) {
    return res.status(404).json({error: 'No to-do was found with that id'});
  }

  const newToDo = {
    ...foundToDo,
    title,
    deadline
  }


  user.todos[foundToDoIdx] = {
    newToDo
  }

  user.todos.splice(foundToDoIdx, 1);
  user.todos.push(newToDo);
  
  return res.status(200).json(newToDo);
});

app.patch('/todos/:id/done', checksExistsUserAccount, (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const foundToDoIdx = user.todos.findIndex(todo => todo.id === id);
  const foundToDo = user.todos.find(todo => todo.id === id);

  if(foundToDoIdx === -1) {
    return res.status(404).json({error: 'No to-do was found with that id'});
  }

  user.todos[foundToDoIdx] = {
    ...foundToDo,
    done: true
  }

  return res.status(200).json(user.todos[foundToDoIdx]);

});

app.delete('/todos/:id', checksExistsUserAccount, (req, res) => {
  const { user } = req;
  const { id } = req.params;

  const foundToDoIdx = user.todos.findIndex(todo => todo.id === id);

  if(foundToDoIdx === -1) {
    return res.status(404).json({error: 'No to-do was found with that id'});
  }

  user.todos.splice(user.todos[foundToDoIdx], 1);

  

  return res.status(204).json(user.todos[foundToDoIdx]);

});

module.exports = app;