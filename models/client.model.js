const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema (
    {
        name: {
            type: String
        },
        lastName: {
            type: String
        },
        age: {
            type: Number,
        },
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        hostpot_asteroids:{
            type: Number,
        },
        price:{
            type: Number,
        }

    },
    {
        versionKey: false,
    }
)

const Client = mongoose.model('Client', clientSchema)
module.exports = Client