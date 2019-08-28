require('dotenv').config()
const express = require('express'),
    cors = require('cors'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth20').Strategy,
    InstagramStrategy = require('passport-instagram').Strategy,
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

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackUrl: '/auth/google/callback'
}, 

    (accessToken,refreshToken,profile,cb) => {
        console.log(chalk.red(JSON.stringify(profile)))
        user = {...profile}
        return cb(null, profile)
    }))

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))
app.get('/auth/google/callback', passport.authenticate('google'), (req,res) => {
    res.redirect('/profile')
})

// Instagram Strategy
passport.use(new InstagramStrategy({
    clientID: keys.INSTAGRAM.clientID,
    clientSecret: keys.INSTAGRAM.clientSecret,
    callbackUrl: '/auth/instagram/callback'
}, 

    (accessToken,refreshToken,profile,cb) => {
        console.log(chalk.orange(JSON.stringify(profile)))
        user = {...profile}
        return cb(null, profile)
    }))

app.get('/auth/instagram', passport.authenticate('instagram'))
app.get('/auth/instagram/callback', passport.authenticate('instagram'), (req,res) => {
    res.redirect('/profile')
})

// user session
app.get('/user', (req,res) => {
    console.log('getting user data')
    res.send(user)
})

app.get('/auth/logout', (req,res) => {
    console.log('logging out')
    user = {}
    res.redirect('/')
})


// Server
app.listen(SERVER_PORT, () => {
    console.log(`${SERVER_PORT} is listening`)
})