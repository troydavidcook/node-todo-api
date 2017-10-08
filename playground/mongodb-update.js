// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server.');

db.collection('Todos').findOneAndUpdate({
  _id: new ObjectID("59d7eb83d4ff3b37ccde19cd")
}, {
  $set: {
    completed: true
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID("59d6ae97888ebb742b180a86")
}, {
  $set: {
    name: 'Troy David Cook'
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID("59d6ae97888ebb742b180a86")
}, {
  $inc: {
    age: 1
  }
}, {
  returnOriginal: false
}).then((result) => {
  console.log(result);
});

  db.close();
});
