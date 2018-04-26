'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const Feed = require('./feed');

var ChannelSchema = new Schema({
  topic: {type: String, unique: true},
  adjective: String,
  urlSegment: {type: String, unique: true},
  feeds: [ String ],
});

var VideoSchema = new Schema({
  shortId: {type: String, unique: true, default: shortid.generate},
  thumbnailUrl: String,
  title: String,
  description: String,
  url: String,
  author: String,
  authorUrl: String,
  uploader: String,
  uploadDate: Date,
  sourceUrl: String,
  channels: [ String ],
  channelIds: [{ type: Schema.Types.ObjectId, ref: 'Channel' }],
  licenseType: String,
  licenseUrl: String
});

module.exports = {
  Channel: mongoose.model('Channel', ChannelSchema),
  Video: mongoose.model('Video', VideoSchema)
}
