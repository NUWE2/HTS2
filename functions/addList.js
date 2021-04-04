const Client = require('../models/client.model')
const Pha = require('../models/pha.model')

const addList = async (model, list) => {
    switch (model) {
        case 'pha':
            await Pha.insertMany(list)
            break;
        case 'client':
            await Client.insertMany(list)
            break
        default:
            break;
    }
}
module.exports = addList