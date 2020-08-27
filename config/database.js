const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/knowledge-filter', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.on('connected', function () {
  console.log(`Mongoose connected to: ${db.host}:${db.port}`);
});
