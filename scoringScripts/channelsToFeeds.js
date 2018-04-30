const Database = require('../database');
const Feed = require('../model/feed');
const Models = require('../model/video');
const Video = Models.Video;
const ScoredVideo = require('../model/scoredVideo');

Video.find()
.populate('channelIds')
.then(videos => {
  videos.forEach(function(video) {
    ScoredVideo.find({ video: video._id, feed: "home"})
    .limit(1)
    .count()
    .then(matchingVideos => {
      if (matchingVideos === 0) {
        var newScoredVideo = new ScoredVideo({
          video: video._id,
          feed: "home"
        });
        newScoredVideo.save();
      }
    })
    video.channelIds.forEach(function(channel) {
      Feed.find({ channel: channel.urlSegment })
      .then(feeds => {
        feeds.forEach(function(feed) {
          ScoredVideo.find({ video: video._id, feed: feed.key})
          .limit(1)
          .count()
          .then(matchingVideos => {
            if (matchingVideos === 0) {
              var newScoredVideo = new ScoredVideo({
                video: video._id,
                feed: feed.key
              });
              newScoredVideo.save();
            }
          })
        })
      });
    });
  });
})

