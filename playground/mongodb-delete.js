// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server.');

// db.collection('Users').deleteMany({name: 'Troy David Cook'}).then((result) => {
//   console.log(result);
// });

db.collection('Users').findOneAndDelete({
  _id: new ObjectID("59d6ac52ab4aa07369014110")
}).then((results) => {
  console.log(JSON.stringify(results, undefined, 2));
});

  // db.close();
});
