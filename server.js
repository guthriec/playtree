require('dotenv').config();
require('./passport');

const express = require('express');
const Database = require('./database');
const bodyParser = require('body-parser');
const Models = require('./model/video');
const Video = Models.Video;
const Channel = Models.Channel;
const Feed = require('./model/feed');
const User = require('./model/user');
const ScoredVideo = require('./model/scoredVideo');
const ServedVideo = require('./model/servedVideo');
const path = require('path');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var request = require('request');

var app = express();
var router = express.Router();

var port = process.env.PORT || 3001;

function cors(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials', 'true');
  res.set('Access-Control-Allow-Methods',
          'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.set('Access-Control-Allow-Headers',
          'Origin, Accept,Content-Type,X-Requested-With,Access-Control-Request-Method,Access-Control-Request-Headers');
  res.set('Cache-Control', 'no-cache');
  next();
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(cors);
router.use(cors);
router.options("*", cors);

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized...'});
});

router.post('/import', function(req, res) {
  var vimeoUrl = req.body.vimeoUrl;
  var vimeoEndpoint = ('https://vimeo.com/api/oembed.json' +
                       '?url=' +
                       encodeURIComponent(vimeoUrl));
  request(vimeoEndpoint, { json: true }, (err, apiRes, body) => {
    if (err) {
      console.log(err);
      return;
    }
    var uniqueSourceId = body.provider_url + body.video_id;
    Video.findOne({uniqueSourceId: uniqueSourceId}, function(err, video) {
      if (err) {
        console.log(err);
        return res.status(500).send("Internal error finding video: " + err);
      } else if (video) {
        return res.status(200).json({video: video});
      } else {
        Video.create({
          thumbnailUrl: body.thumbnail_url,
          title: body.title,
          description: body.description,
          author: body.author_name,
          authorUrl: body.author_url,
          sourceUrl: vimeoUrl,
          sourceId: body.video_id,
          sourceName: "Vimeo",
          uniqueSourceId: uniqueSourceId
        }, function(createErr, newVideo) {
          if (createErr) {
            console.log(createErr);
            return res.status(500).send("Internal error creating video: " + createErr);
          } else {
            ScoredVideo.create({
              video: newVideo,
              feed: 'home'
            }, function(scoredCreateErr, scoredVideo) {
              if (scoredCreateErr) {
                console.log(scoredCreateErr);
              }
            });
            return res.status(200).json({video: newVideo});
          }
        });
      }
    });
  })
});

router.post('/suggest-channel', function(req, res) {
  console.log(req.body);
  var query = { shortId: req.body.videoId, channels: { $ne: req.body.channelTopic } };
  Video.findOneAndUpdate(query,
    { $push: { channels: req.body.channelTopic } },
    function(err, video) {
      if (err) {
        console.log(err);
      }
      ScoredVideo.create({
        video: video,
        feed: req.body.channelUrl
      }, function(scoredCreateErr, scoredVideo) {
        if (scoredCreateErr) {
          console.log(scoredCreateErr);
        }
      });
    
    }
  );
});

router.post('/login',
  passport.authenticate('local', {session: false}),
  function(req, res, next) {
    var token = jwt.sign({id: req.user._id}, process.env.JWT_SECRET, {
      expiresIn: 60*60*24
    });
    res.status(200).json({auth: true, token: token});
  }
)

router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 12);
  User.create({
    email: req.body.email,
    password: hashedPassword
  }, function(err, user) {
    if (err) {
      return res.status(500).send("Internal error registering user.");
    }
    var token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
      expiresIn: 60*60*24
    });
    res.status(200).json({auth: true, token: token});
  });
})

router.route('/video/:id')
.get(function(req, res) {
  Video.findOne({ 'shortId':  req.params.id})
  .then(video => {
    res.json(video);
  })
})

router.route('/feed/:feedKey')
.get(function(req, res) {
  Feed.findOne({ 'key' : req.params.feedKey })
  .then(feed => {
    ScoredVideo.find({ feed: feed.key })
    .populate('video')
    .sort({ score: -1 })
    .limit(20)
    .then(scoredVideos => {
      Promise.all(scoredVideos.map((scoredVideo) => {
        return ServedVideo.create({
          videoId: scoredVideo.video.shortId,
          scoredVideo: scoredVideo._id,
          feed: feed.key
        }).then((servedVideo) => {
          return ScoredVideo.findByIdAndUpdate(
            scoredVideo._id,
            { $inc: {'runningServedCount' : 1}},
            { new: true }
          ).then((newScoredVideo) => {
            newScoredVideo.updateScore();
            return {
              servedId: servedVideo._id,
              videoData: scoredVideo.video
            };
          })
        }).catch((err) => {
          console.log('ERRRRORRR: ' + err);
        });
      }))
      .then((videos) => {
        res.json({
          info: feed,
          videos: videos
        });
      });
    })
    .catch((err) => {
      console.log('another error!: ' + err);
    })
  })
  .catch((err) => {
    console.log('the biggest error!: ' + err);
  })
})

router.route('/channel')
.get(function(req, res) {
  Channel.find({})
  .select('topic', 'urlSegment')
  .then(channels => {
    res.json({
      channels: channels
    })
  })
});

router.route('/channel/:channel')
.get(function(req, res) {
  var channel = req.params.channel;
  Channel.findOne({ 'urlSegment': channel })
  .then(info => {
    res.json({
      info: info
    });
  })
});

router.route('/watched')
.post(function(req, res) {
  ServedVideo.findByIdAndUpdate(req.body.servedId, {'watched': true})
  .then(oldServedVideo => {
    if (!oldServedVideo.watched) {
      ScoredVideo.findByIdAndUpdate(
        oldServedVideo.scoredVideo,
        { $inc: {'runningViewCount' : 1}},
        { new: true }
      ).then((newScoredVideo) => {
        newScoredVideo.updateScore();
      }).catch((err) => {
        console.log(err);
      })
    }
  })
  .catch((err) => {
    console.log(err);
  })
});

app.use('/api', router);

app.use('/s3', require('react-s3-uploader/s3router')({
  bucket: "playtree-video-in",
  headers: {'Access-Control-Allow-Origin': '*'}
}));

app.use(require('forest-express-mongoose').init({
  modelsDir: __dirname + '/model',
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  mongoose: require('mongoose')
}));

app.get('/*', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
