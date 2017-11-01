// This is test specific, not using live data.

// testing notes   mocha, supertest

const expect = require('expect');
const request = require('supertest');

const{ObjectID} = require('mongodb')
const{app} = require('./../server');
const{Todo} = require('./../models/todo');


const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
},
  {
  _id: new ObjectID(),
  text: 'Second test todo'
},
  {
  _id: new ObjectID(),
  text: 'Third test todo',
  completed: true,
  completedAt: 123
  }];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
      var text = 'Test todo text';
      request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => done(err));
      });
  });


  it('should not create a todo with invalid body data', (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find().then((todos) => {
        expect(todos.length).toBe(3);
        done();
      }).catch((err) => done(err));
    });
  });
});
// Test for no todo, todo with invalid ID, and for all todos.

describe ('GET todos/', () => {
  it('should retrieve all todos', (done) => {
    request(app)
    .get('/todos/')
    .expect(200)
    .expect((response) => {
      expect(response.body.todos.length).toBe(3)
    })
    .end(done) 
  });
  it('should respond with a 404 if there is no todo by that ObjectID', (done) => {
    var todoId = new ObjectID().toHexString();
    request(app)
    .get(`/todos/${todoId}`)
    .expect(404)
    .end(done)
  });
  it('should respond with a 404 when there is an invalid ObjectID', (done) => {
    request(app)
    .get('/todos/123tdc')
    .expect(404)
    .end(done)
  });
});

 describe('DELETE /todos/:id', () => {
  it('should get 404 when Object ID is invalid', (done) => {
    request(app)
      .delete('/todos/123tdc')
      .expect(404)
      .end(done)
  });
  it('should get 404 there is no todo', (done) => {
    var todoId = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${todoId}`)
      .expect(404)
      .end(done)
  });
  it('should delete a todo', (done) => {
    var id = todos[0]._id.toHexString();

    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(id).then((todo) => {
          expect(todo).toBeNull();
          done();
        }).catch((err) => done(err));
      });
  });
});

describe('PATCH /todos/:id', () => {
  it('should update the todo', (done) => {
    var id = todos[2]._id.toHexString();
    var text = 'New todo text';

    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: true,
        completedAt: 9876,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(typeof(res.body.todo.completedAt)).toEqual('number');
        expect(res.body.todo.completed).toBe(true);
    })
    .end(done);
  });
  it('should clear completedAt when todo is not completed', (done) => {
    var id = todos[2]._id.toHexString();
    var text = "Finally changing the text!!";

    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: false,
        completedAt:
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeNull();
      })
      .end(done)
  });
  it('should get 404 when Object ID is invalid', (done) => {
    request(app)
      .patch('/todos/123tdc')
      .expect(404)
      .end(done)
  });
  it('should get 404 there is no todo', (done) => {
    var todoId = new ObjectID().toHexString();
    request(app)
      .patch(`/todos/${todoId}`)
      .expect(404)
      .end(done)
  });
});