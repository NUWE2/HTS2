const Client = require('../models/client.model');
const getHotspot = require('../functions/getHotspot');
const getPrice = require('../functions/getPrice');
const {clientCsvToJson} = require('../controllers/database.controller');
const addList = require("../functions/addList");

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
    
    saveClientsFromCSV: async(req, res) => {
        const cliArray = await clientCsvToJson();
        const arrayWithCli = cliArray.map((cli) => {
            
            return getHotspot(cli);
        });

        
        await addList('client', arrayWithHot);
 
        //const arrayWithPrice = await getPrice(arrayWithHot);

        //await addList('client', arrayWithPrice);

        //console.log(arrayWithHot);

        return res
            .status(200)
            .send({
                status: 'success',
                arrayWithHot
            })
    }

}

module.exports = controller;