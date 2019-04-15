//create a Strategy
//it will help us to load the payload which is the user data and do what we want with that
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const Admin = mongoose.model('admins');

const options = {};
//
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      //the payload should include the admin info that we include in post request in admins.js file
      //get the user that been sent with the token
      Admin.findById(jwt_payload.id)
      .then(admin => {
        if(admin){
          return done(null,admin);
        }
        return done(null,false);
      })
      .catch(err => console.log(err));
    })
  );
};
