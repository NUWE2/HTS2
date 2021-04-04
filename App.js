const app = require('express')()
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

// --- DATABASE CONFIG ---
require('./configs/db.config')

// --- PORT ---
const PORT = process.env.PORT || 3000

// --- MIDDLEWARE SETUP
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// --- CORS MIDDLEWARE ---
app.use(cors())

// --- PASSPORT CONFIG ---
require('./configs/passport.config')


// --- ROUTES ---
const index = require('./routes/index.routes')
app.use('/', index)


// --- ERROR ROUTES ---
app.use((req, res, next) => {
    res.status(404).send('Page not found')
})
app.use((err, req, res, next) => {
    if(!res.headersSent) {
        res.status(500).send('Error')
    }
})

// --- SERVER LISTEN --- 
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`)
})