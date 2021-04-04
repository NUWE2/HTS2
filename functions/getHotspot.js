const Pha = require('../models/pha.model')

const getHotspot = (clients) => {
    const newClientsArr = clients.map( async client => {
        const newLat0 = client.latitude - 15
        const newLat1 = client.latitude + 15
        const newLong0 = client.longitude - 15
        const newLong1 = client.longitude + 15
        const phas = await Pha.find({ $and: [ { latitude: { $lte: newLat1} },
        { latitude: { $gte: newLat0} },
        { longitude: { $lte: newLong1 } },
        { longitude: { $gte: newLong0 } } ] })
       client.hotspot_asteroids =  phas.length

        return client;
    })
    return newClientsArr
}
module.exports = getHotspot