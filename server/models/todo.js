var mongoose = require('mongoose');


var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};

//   // This is using a constructor function to set up what we defined above, using 'NEW'
//
// var newTodo = new Todo({
//   text: 'Get into ridiculous facebook thread',
//   completed: true,
//   completedAt: Date.now()
// });
//
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc)
// }, (err) => {
//   console.log('Unable to save todo');
// });
