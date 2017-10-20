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
  text: 'Third test todo'
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

describe('GET /todos', () => {
  it('should retrieve all todos', (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(3)
    })
    .end(done)
  });
  it('should return a 404 if the ObjectID is invalid', (done) => {
    request(app)
    .get('/todos/123troy')
    .expect(404)
    .end(done)
  });
  it('should return a 404 if there is no todo with that ObjectID', (done) => {
    var todoId = new ObjectID().toHexString();
    request(app)
    .get(`/todos/${todoId}`)
    .expect(404)
    .end(done)
  });
});
