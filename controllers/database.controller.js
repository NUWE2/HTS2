const csvtojson = require('csvtojson')
const PHA = require('../models/pha.model')
const Client = require('../models/client.model')
const path = require('path')
const csvPhaFilePath =  "../assets/OrbitalParameters_PHAs_1.csv"
const csvClientsFilePath =  "../assets/List_Of_Clients.csv"


  
    const phaCsvToJson = async () => {
        return await csvtojson().fromFile(path.join(__dirname, csvPhaFilePath))
    }

   const clientCsvToJson = async () => {
        return await csvtojson().fromFile(path.join(__dirname, csvClientsFilePath))
    }

   
    module.exports = {phaCsvToJson, clientCsvToJson};
