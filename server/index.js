require('dotenv').config()
const express = require('express'),
    cors = require('cors'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook'),
    keys = require('../config'),
    chalk = require('chalk'),
    app = express(),
    { SERVER_PORT } = process.env;

let user = {}

passport.serializeUser( (user,cb) => {
    cb(null,user)
})

passport.deserializeUser( (user,cb) => {
    cb(null,user)
})



app.use(cors())   
app.use(passport.initialize());


// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackUrl: '/auth/facebook/callback'
}, 

    (accessToken,refreshToken,profile,cb) => {
        console.log(chalk.blue(JSON.stringify(profile)))
        user = {...profile}
        return cb(null, profile)
    }))

app.get('/auth/facebook', passport.authenticate('facebook'))
app.get('/auth/facebook/callback', passport.authenticate('facebook'), (req,res) => {
    res.redirect('/profile')
})


// Server
app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})