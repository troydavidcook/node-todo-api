// Restart mongodb server: ```mongod --dbpath <path to data directory>```

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = { mongoose };
