// mongoose quierying
const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '59dbc24a9852534ff668b475';
var userId = '59d94cef803d220b6c85e823';

// if (!ObjectId.isValid(id)) {
//   console.log('Not a valid ID');
// }
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });
//
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     console.log('ID not found.');
//   } else {
//     console.log('Todo', todo);
//   }
// }).catch((err) => {
//   console.log("Sorry, couldn't find the id", err);
// });


if (!ObjectId.isValid(userId)) {
  console.log('ID is not valid. Please try another ID');
}
User.findById(userId).then((user) => {
  if (!user) {
    return console.log('User not found. Please try another User ID.');
  } else {
    console.log(JSON.stringify(user, undefined, 2));
  }
}).catch((err) => {
  console.log('Error Found:', err);
});
