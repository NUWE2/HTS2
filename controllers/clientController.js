const Client = require('../models/client.model');
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
            
            cli.name = String(cli.name)
            cli.lastname = String(cli.lastname)
            cli.age = Number(cli.age)
            cli.latitude = Number(cli.latitude)
            cli.longitude = Number(cli.longitude)

            //cli.hotspot_asteroids = Number(cli.Hotspot_asteroids)
            //cli.price = Number(cli.Price)

            return cli;
        });
        await addList('client', arrayWithCli);
        console.log(arrayWithCli);

        return res
            .status(200)
            .send({
                status: 'success',
                arrayWithCli
            })
    }

}

module.exports = controller;