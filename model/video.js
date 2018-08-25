'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const ScoredVideo = require('./scoredVideo');

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
  uploadDate: {type: Date, default: Date.now },
  sourceUrl: String,
  sourceName: String,
  sourceId: String,
  uniqueSourceId: {type: String, index: true, sparse: true},
  channels: [ String ],
  channelIds: [{ type: Schema.Types.ObjectId, ref: 'Channel' }],
  licenseType: String,
  licenseUrl: String
});

VideoSchema.post('remove', function(video) {
  ScoredVideo.deleteMany({ video: video }, function (err) {
    if (err) {
      console.log(err);
    }
  })
});

module.exports = {
  Channel: mongoose.model('Channel', ChannelSchema),
  Video: mongoose.model('Video', VideoSchema)
}
