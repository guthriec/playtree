'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FeedSchema = new Schema({
  key: {type: String, unique: true},
  channel: String
});

module.exports = mongoose.model('Feed', FeedSchema)
