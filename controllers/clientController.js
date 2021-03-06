const Client = require('../models/client.model');
const getHotspot = require('../functions/getHotspot');
const getPrice = require('../functions/getPrice')
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

        const newClientsArr = await Promise.all(cliArray.map( async client => {

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
               client.price = getPrice(client);
            //console.log(client)
            return client;
        }))
       
        console.log(newClientsArr)
       await addList('client', newClientsArr);
        

        return res
            .status(200)
            .send({
                status: 'success',
                newClientsArr
            })
    },

    getClient: async (req, res) => {
    // Recoger el id de la url
    const clientId = req.params.id;

    // Comprobar que existe
    if(!clientId || clientId === null){
      return res.status(400).send({
        status: 'error',
        message: 'Se necesita introducir un identificador para buscar al cliente en la base de datos'
      })
    }
    // Buscar el cliente
    await Client.findById(clientId, (err, client) => {
      if(err || !client){
        return res
          .status(500)
          .send({
            status: 'error',
            message: 'El cliente no existe o no se ha podido conectar con la base de datos'
          })
      }

      // Devolverlo en json
       return res
        .status(200)
        .send({
          status: 'success',
          client: client
        });
    })

  },

    updateClient: async (req, res) =>{

    const clientId = req.params.id;
    const {name, lastname, age, latitude, longitude, hotspot_asteroids, price} = req.body;
    console.log(name)
    // Comprobar que existe 
    if(!clientId || clientId === null){
      return res.status(400).send({
        status: 'error',
        message: 'Se necesita introducir un identificador para buscar al cliente en la base de datos'
      })
    }

    const userUpdated= await Client.findByIdAndUpdate(clientId, {$set: {
      name: name,
      lastname: lastname,
      age: age,
      latitude: latitude,
      longitude: longitude,
      hotspot_asteroids: hotspot_asteroids,
      price: price
    }})
    if(!userUpdated || userUpdated==null){

      return res.status(404).send({
        status: "Error",
        description: "Usuario no encontrado o no actualizado, prueba otra vez."
      })
    }

      // Devolverlo en json
       return res
        .status(200)
        .send({
          status: 'success',
          client: userUpdated
        });
    
  },

  deleteClient: async (req, res) =>{

    const clientId = req.params.id;
    // Comprobar que existe 
    if(!clientId || clientId === null){
      return res.status(400).send({
        status: 'error',
        message: 'Se necesita introducir un identificador para elimnar al cliente de la base de datos'
      })
    }

     const userDeleted = await Client.findByIdAndDelete(clientId);
     console.log(userDeleted)
    if(!userDeleted || userDeleted==null){

      return res.status(404).send({
        status: "Error",
        message: "Usuario no eliminado, prueba otra vez."
      })
    }

      // Devolverlo en json
       return res
        .status(200)
        .send({
          status: 'success',
          userDeleted: userDeleted
        });
    
  }

}

module.exports = controller;