require('dotenv').config();

const mongoose = require('mongoose');

class Database {
  constructor() {
    this._connect()
  }

  _connect() {
    mongoose.connect(process.env.MONGO_URL);
  }
}

module.exports = new Database();
