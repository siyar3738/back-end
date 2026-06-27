const mongoose = require('mongoose');

const connect = async () => {
  try {
    const uri = 'https://siyar3738.github.io/Front-end/';
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to the database');
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
};

module.exports = connect;
