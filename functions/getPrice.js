const getPrice = (clientsArr) => {
    const newClientsArr = clientsArr.map(client => {
        const fixedPrice = 170
        const variablePrice = (100 * client.age)/30 + 10*client.hotspot_asteroids
        client.price = fixedPrice + variablePrice
        return client
    })
    return newClientsArr
}
module.exports = getPrice