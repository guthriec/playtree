'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ScoredVideoSchema = new Schema({
  video: { type: Schema.Types.ObjectId, ref: 'Video' },
  feed: { type: String, required: true },
  score: {type: Number, default: 0.0},
  runningServedCount: {type: Number, default: 10},
  runningViewCount: {type: Number, default: 10}
});

ScoredVideoSchema.methods.updateScore = function() {
  this.score = (this.runningViewCount + 1.0) / (this.runningServedCount + 1.0);
  this.save();
}

ScoredVideoSchema.index({ video: 1, feed: 1 }, { unique: true });

module.exports = mongoose.model('ScoredVideo', ScoredVideoSchema)
