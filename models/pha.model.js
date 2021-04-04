const mongoose = require('mongoose')
const Schema = mongoose.Schema

const phaSchema = new Schema (
    {
        full_name:{
            type: String
        },
        a: {
            type: Number
        },
        e:{
            type: Number
        },
        i:{
            type: Number
        },
        om:{
            type: Number
        },
        w:{
            type: Number
        },
        ma:{
            type: Number
        },
        latitude:{
            type: Number
        },
        longitude:{
            type: Number
        }

    },
    {
        versionKey: false //Para que no aparezca el campo _v en cada documento.
    }
)

const Pha = mongoose.model('PHA', phaSchema)
module.exports = Pha