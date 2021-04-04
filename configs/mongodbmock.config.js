const mongoose = require('mongoose')
const  MongoMemoryServer = require('mongodb-memory-server-core').MongoMemoryServer

const mongoServer = new MongoMemoryServer()

mongoServer.getUri().then(mongoUri => {
    const mongooseOpts = {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
    mongoose.connect(mongoUri, mongooseOpts)
    mongoose.connection.on('error', e => {
        console.error(e)
        mongoose.connect(mongoUri, mongooseOpts)
    })
    mongoose.connection.once('open', () => {
        console.log('Conectado a Mock! ', mongoUri)
    })
})

