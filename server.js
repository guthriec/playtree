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
const path = require('path');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var passport = require('passport');

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


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});


app.listen(port, function() {
  console.log(`api running on port ${port}`);
});
