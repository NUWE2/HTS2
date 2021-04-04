const Client = require('../models/client.model')
const Pha = require('../models/pha.model')

const findAll = async () => {

  const findAsteroids = () => Pha.find({});
  const findUsers = () => Client.find({});

  Promise.all([findAsteroids(), findUsers()])
    .then(results => results)
  }

  module.exports = findAll;