const app = require('express')()
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const passport = require('passport')

// --- DATABASE CONFIG ---
// require('./configs/db.config')

// --- MOCK CONFIG ---
require('./configs/mongodbmock.config')

// --- PORT ---
const PORT = process.env.PORT || 3000

// --- MIDDLEWARE SETUP
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// --- CORS MIDDLEWARE ---
app.use(cors())

// --- PASSPORT CONFIG ---
require('./configs/passport.config')
passport.serializeUser((user,cb) => {
    cb(null,user)
})
passport.deserializeUser((obj,cb) => {
    cb(null, obj)
})
app.use(passport.initialize())
app.use(passport.session())

// --- ROUTES ---
const index = require('./routes/index.routes')
const phaRoutes = require('./routes/pha.routes');
const clientRoutes = require('./routes/client.routes');
const userRoutes = require('./routes/user.routes');


// Rutas
app.use('/', index)
app.use('/api', phaRoutes);
app.use('/client', clientRoutes);
app.use('/', userRoutes);


// --- ERROR ROUTES ---
app.use((req, res, next) => {
    res.status(404).send('Page not found')
})
/*
app.use((err, req, res, next) => {
    if(!res.headersSent) {
        res.status(500).send('Error')
    }
})
*/
// --- SERVER LISTEN --- 
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`)
})