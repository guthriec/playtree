require('dotenv').config();

const express = require('express');
const Database = require('./database');
const bodyParser = require('body-parser');
const Models = require('./model/video');
const Video = Models.Video;
const Channel = Models.Channel;
const Feed = require('./model/feed');
const ScoredVideo = require('./model/scoredVideo');
const path = require('path');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;


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

app.use(express.static(path.join(__dirname, 'client/build')));
console.log(path.join(__dirname, 'client/build'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.use(cors);
router.use(cors);
router.options("*", cors);

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized...'});
});

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
      res.json({
        info: feed,
        videos: scoredVideos
      })
    })
  })
})


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

router.route('/feedback')
.post(function(req, res) {
  res.json([]);
})

app.use('/api', router);

app.use(require('forest-express-mongoose').init({
  modelsDir: __dirname + '/model',
  envSecret: process.env.FOREST_ENV_SECRET,
  authSecret: process.env.FOREST_AUTH_SECRET,
  mongoose: require('mongoose')
}));

app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
