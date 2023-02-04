
const { response } = require('express');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json())


const customers = [];

function verifyIfAccountExistsCPF(req, res, next) {
  const { cpf } = req.headers;
     
  const customer = customers.find(customer => customer.cpf === Number(cpf));

  if(!customer) {
    return res.status(400).json({ error: 'A customer with this CPF was not found'});
  }

  req.customer = customer;

  return next();
}

function getBalance(statement) {


  const balance = statement.reduce((ac, val) => {

    if(val.type === 'Credit') {
      return ac = ac + val.amount;
    } else if(val.type === 'Debit') {
      console.log(val)
      return ac = ac - val.amount
    }
  }, 0);

  return balance;
}


app.get('/account', verifyIfAccountExistsCPF, (req, res) => {
  const {customer} = req;

  return res.json({customers});
})

app.post('/account', (req, res) => {
  const { cpf, name } = req.body;
  const id = uuidv4();
  
  const customerAlreadyExists = customers.some(customer => customer.cpf === cpf);

  if(customerAlreadyExists) {
    return res.status(404).json({'message': 'This cpf is already been used'});
  }


  customers.push({
    id,
    cpf,
    name,
    statement: [],
  })

  return res.status(201).send();
  
})

// app.use(verifyIfAccountExistsCPF);

app.get('/statement', verifyIfAccountExistsCPF, (req, res) => {
  const { customer } = req;

  return res.json(customer.statement);
})

app.post('/deposit', verifyIfAccountExistsCPF, (req, res) => {
  const { description, amount } = req.body;

  const { customer } = req;

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'Credit'
  }

  customer.statement.push(statementOperation);

  return res.status(201).send();

})

app.post('/withdraw', verifyIfAccountExistsCPF, (req, res) => {
  const { description, amount } = req.body;

  const { customer } = req;

  const balance = getBalance(customer.statement);


  if(balance < amount) {
    return res.status(400).json({error: "Insufficient sald!"})
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'Debit'
  }

  customer.statement.push(statementOperation);

  return res.status(201).send();

})

app.get('/statement/date', verifyIfAccountExistsCPF, (req, res) => {
  const { customer } = req;
  const { date } = req.query;

  const formattedDate = new Date(date + " 00:00");

  const statement = customer.statement.filter(statement => statement.created_at.toDateString() === new Date(formattedDate).toDateString());

  if(!statement) {
    return res.status(400).json({error: 'No statements were found'});
  }

  return res.status(200).json({statements: statement});
})

app.put('/account', verifyIfAccountExistsCPF, (req, res) => {
  const { name } = req.body;


  const { customer } = req;

  customer.name = name;

  return res.status(201).send();
})

app.delete('/account', verifyIfAccountExistsCPF, (req, res) => {
  const { customer } = req;

  if(!customer) 

  customers.splice(customer, 1);

  return res.status(200).json(customers);

})

app.get('/balance', verifyIfAccountExistsCPF, (req, res) => {
  const { customer } = req;

  const balance = getBalance(customer.statement);

  return res.json(balance);
})

app.listen(3333)