const Client = require('../models/client.model');
const getHotspot = require('../functions/getHotspot');
const {clientCsvToJson} = require('../controllers/database.controller');
const addList = require("../functions/addList");
const Pha = require('../models/pha.model');
const { parseAsync } = require('json2csv');

const controller = {

    getAllClients: async (req, res) => {
        Client.find({}).exec((err, clients) => {
            if (err) {
                return res
                    .status(500)
                    .send({
                        status: 'error',
                        message: 'Error al cargar los usuarios'
                    })
            } else if (!clients) {
                return res
                    .status(404)
                    .send({
                        status: 'error',
                        message: 'No hay clientes para mostrar'
                    })

            }
            return res
                .status(200)
                .send({
                    status: "success",
                    clients
                })
        })
    },
    // He copiado el codigo de la funcion getHotspot
    saveClientsFromCSV: async (req, res) => {
        const cliArray =  await clientCsvToJson();

        const newClientsArr =  cliArray.map( async client => {

            client.age = Number(client.age);
            client.latitude = Number(client.latitude);
            client.longitude = Number(client.longitude);
            

            const newLat0 = client.latitude - 15
            const newLat1 = client.latitude + 15
            const newLong0 = client.longitude - 15
            const newLong1 = client.longitude + 15

            const phas = await Pha.find({ $and: [ { latitude: { $lte: newLat1} },
            { latitude: { $gte: newLat0} },
            { longitude: { $lte: newLong1 } },
            { longitude: { $gte: newLong0 } } ] })
           
            client.hotspot_asteroids =  phas.length;
           // console.log(client)
            return await client;
        })
       
        console.log(newClientsArr)
       // await addList('client', newClientsArr);
        

        return res
            .status(200)
            .send({
                status: 'success',
                newClientsArr
            })
    }

}

module.exports = controller;