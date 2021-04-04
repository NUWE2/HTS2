const Client = require('../models/client.model');


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


}

module.exports = controller;