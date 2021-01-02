const config = require('./authConfig');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Database
const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
    
    passport.use(new GoogleStrategy({
        clientID: config.oauth.googleAuth.clientID,
        clientSecret: config.oauth.googleAuth.clientSecret,
        callbackURL:config.oauth.googleAuth.callbackURL
    },
        async function(accessToken, refreshToken, profile, done) {
            
            //Searching an existing user in DB;
            const fetchedUserEmail = profile.emails[0].value;
    
            const candidate = await User.findOne({email: fetchedUserEmail});
    
            if(candidate) {
                done(null, candidate)
            }
            else {
                const hashedPassword = bcrypt.hashSync(profile.id, 2);
    
                const defaultRole = new Role({value: "USER"});
    
                const user = await new User({
                    email: fetchedUserEmail,
                    username: profile.displayName,
                    password: hashedPassword,
                    roles: [defaultRole.value]
                })
        
                await user.save();
        
                return done(null, user);
                }
            }
    ))

    passport.serializeUser(async (user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        const foundUser = await User.findOne({_id: id});
        done(null, foundUser);
    });
}