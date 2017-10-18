const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {

});

app.get('/todos/:id', (req, res) => {
  var todoId = (req.params.id);

    if (!ObjectID.isValid(todoId)) {
      return res.status(404).send();
    }

    Todo.findById(todoId).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

      res.send({todo});

  }).catch((err) => {
    res.status(400).send();
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send();
  });
});

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(3000, () => {
  console.log('Server started on Port 3000');
});

module.exports = {app};
