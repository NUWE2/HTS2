const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

// LOGIN strategy with local Strategy from Passport
passport.use(
    'login',
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            const user = await User.findOne({ email })
            if(!user){
                return done(null, false, { errorMessage: 'User not found' })
            }
            const result = await bcrypt.compare(password, user.password)
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