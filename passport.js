const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./model/user');

const bcrypt = require('bcryptjs');
var passportJWT = require('passport-jwt');
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;


var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, done) {
 User.findOne({id: jwt_payload.sub})
  .then(user => {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
  .catch(err => done(err));
}));

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, function(email, password, done) {
  return User.findOne({email: email})
    .then(user => {
      if (!user) {
        return done(null, false, {message: 'No user found for that email'});
      }
      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user, {message: 'Logged in successfully'});
      } else {
        return done(null, false, {message: 'Incorrect password'});
      }
    })
    .catch(err => done(err));
}));