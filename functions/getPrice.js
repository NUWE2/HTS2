const getPrice = (client) => {
        const fixedPrice = 170
        const variablePrice = (100 * client.age)/30 + 10*client.hotspot_asteroids
       const price = fixedPrice + variablePrice
        return price
}
module.exports = getPrice