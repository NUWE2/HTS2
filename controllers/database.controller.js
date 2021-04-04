const csvtojson = require('csvtojson')
const PHA = require('../models/pha.model')
const Client = require('../models/client.model')
const path = require('path')
const csvPhaFilePath =  "../assets/OrbitalParameters_PHAs_1.csv"
const csvClientsFilePath =  "../assets/List_Of_Clients.csv"


  
    export const phaCsvToJson = async () => {
        return await csv().fromFile(path.join(__dirname, csvPhaFilePath))
    }

   export const clientCsvToJson = async () => {
        return await csv().fromFile(path.join(__dirname, csvClientsFilePath))
    }

   

