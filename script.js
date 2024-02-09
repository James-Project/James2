//Import necessary modules

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys.js');

//Creates an express application
const app = express();

//configure Pasport to use Google Oauth 2.0 strategy

passport.use(new GoogleStrategy( {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'http://localhost:5000/auth/google/callback',
    scope: ['openid','profile', 'email']  
},

//callback function to handle authentication

(accessToken, refreshToken, profile, done) => {
    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);
    console.log("Profile:", profile);
     // Here, you can handle the user data and invoke done() to proceed
 }
        
)
);

//Define routes for Google authentication
app.get('/auth/google/', passport.authenticate('google',{
 scope: ['openid','profile', 'email']   
})
);

// Callback routes after successful authentication
app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication, redirect home or wherever you want
        res.redirect('/'); // Redirect to the home page for example
    }
);

// Set up server to listen on specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
