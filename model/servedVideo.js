'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ServedVideoSchema = new Schema({
  scoredVideo: { type: Schema.Types.ObjectId, ref: 'ScoredVideo' },
  videoId: String,
  feed: String,
  servedAt: { type: Date, default: Date.now },
  watched: { type: Boolean, default: false }
});

module.exports = mongoose.model('ServedVideo', ServedVideoSchema);
