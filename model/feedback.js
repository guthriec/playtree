'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
  servedVideo: String,
  feedbackType: String,
  feedbackValence: Number
});
