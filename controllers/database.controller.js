const csvtojson = require('csvtojson')
const PHA = require('../models/pha.model')
const Client = require('../models/client.model')

const csvPhaFilePath =  "../assets/OrbtialParameters_PHAs_1.csv"
const csvClientsFilePath =  "../assets/List_Of_Clients.csv"

csvtojson().fromFile(csvPhaFilePath).then(async(json) =>{
    await PHA.insertMany(json);
 })

 csvtojson().fromFile(csvClientsFilePath).then(async(json) =>{
    await Client.insertMany(json);
 })