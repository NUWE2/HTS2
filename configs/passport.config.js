const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const Client = require('../models/client.model')
const bcrypt = require('bcrypt')
const GitHubStrategy = require('passport-github').Strategy

// LOGIN strategy with local Strategy from Passport
passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            const client = await Client.findOne({ email })
            if(!user){
                return done(null, false, { errorMessage: 'Client not found' })
            }
            const result = await bcrypt.compare(password, client.password)
            if(!result){
                return done(null, false, { errorMessage: 'Wrong password' })
            }
            return done(null, user, { message: 'Logged in Successfully' })
        }
    )
)
// JWT strategy
passport.use(
    'jwt',
    new JwtStrategy(
        {
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        (token, done) => {
            try {
                return done(null, token.user)
            }
            catch(e) {
                done(e)
            }
        }
    )
)
passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'https://hts2.herokuapp.com/user/oauth2/github/callback'
}, (accesToken, refreshToken, profil, cb) => {
    Client.find({ githubId: profile.id }, (err, user) => {
        return cb(err, user)
    })
}))