const Pha = require('../models/pha.model')

const getHotspot = async (clients) => {
    const newClientsArr = clients.map(client => {
        const newLat0 = client.latitude - 15
        const newLat1 = client.latitude + 15
        const newLong0 = client.longitude - 15
        const newLong1 = client.longitude + 15
        const phas = Pha.find({ $and: [ { latitude: { $lte: newLat0 } },
        { latitude: { $gte: newLat1 } },
        { longitude: { $lte: newLong0 } },
        { longitude: { $gte: newLong1 } } ] })
        client.hotspot_asteroids = phas.length

        return client;
    })
    return newClientsArr
}
module.exports = getHotspot