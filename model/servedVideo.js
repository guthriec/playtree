'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ServedVideoSchema = new Schema({
  videoId: String,
  feed: String,
  servedOn: Date
});
