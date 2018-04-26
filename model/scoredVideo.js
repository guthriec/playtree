'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ScoredVideoSchema = new Schema({
  video: { type: Schema.Types.ObjectId, ref: 'Video' },
  feed: String,
  score: {type: Number, default: 0},
});

ScoredVideoSchema.index({ video: 1, feed: 1 }, { unique: true });

module.exports = mongoose.model('ScoredVideo', ScoredVideoSchema)
