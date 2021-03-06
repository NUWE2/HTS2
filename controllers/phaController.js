'use strict'

const validator = require('validator');
const Asteroid = require('../models/pha.model');
const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv').parse;
const FileSystem = require('fs');
const {body2latlong} = require("keplerjs");
const {phaCsvToJson}= require("./database.controller")
const addList = require("../functions/addList")
const controller = {

  save: (req, res) => {

    // Recoger parametros por post
    const params = req.body;

    // validar datos (validator)
    try{
      const validate_full_name = !validator.isEmpty(params.full_name);
      const validate_a = !validator.isEmpty(params.a);
      const validate_e = !validator.isEmpty(params.e);
      const validate_i = !validator.isEmpty(params.i);
      const validate_om = !validator.isEmpty(params.om);
      const validate_w = !validator.isEmpty(params.w);
      const validate_ma = !validator.isEmpty(params.ma);

      if(validate_full_name && validate_a && validate_e && validate_i && validate_om && validate_w && validate_ma){

        // Crear el objeto a guardar
        const asteroid = new Asteroid()

        // Asignar valores
        asteroid.full_name = params.full_name;
        asteroid.a = params.a;
        asteroid.e = params.e;
        asteroid.i = params.i;
        asteroid.om = params.om;
        asteroid.w = params.w;
        asteroid.ma = params.ma;
       
        // Guardar el asteroides
        asteroid.save((err, asteroidStored) => {
          if(err || !asteroidStored){
            return res
              .status(404)
              .send({
                status: 'error',
                message: 'El asteroide no se ha guardado', err
              })
          }
        });

        // Devolver una respuesta

        // Agregar nuestro cometa a la base de datos CSV
        CSVToJSON().fromFile('../assets/OrbitalParameters_PHAs.csv')
          .then(orbitalParameters => {
            orbitalParameters.push({
              "full_name": asteroid.full_name,
              "a": asteroid.a,
              "e": asteroid.e,
              "i": asteroid.i,
              "om": asteroid.om,
              "w": asteroid.w,
              "ma": asteroid.ma,
            });
            const csv = JSONToCSV(orbitalParameters, {fields: ["full_name", "a", "e", "i", "om", "w", "ma"]});
            FileSystem.writeFileSync('../assets/OrbitalParameters_PHAs.csv', csv);
    
          })

        return res
          .status(200)
          .send({
            status: 'success',
            asteroid: asteroid
          })
      }

    }catch(err){
      return res
        .status(500)
        .send({
          status: 'error',
          message: 'Faltan datos por enviar', err
        })
    }
  },

  saveAsteroidsFromCSV: async (req, res) => {
    const phaArray = await phaCsvToJson();
   const arrayWithPos =  phaArray.map((op)=> {
          const position = body2latlong(op);
          op.a = Number(op.a);
          op.e = Number(op.e);
          op.i = Number(op.i);
          op.om = Number(op.om);
          op.w = Number(op.w);
          op.ma = Number(op.ma);
          
          position.lat %= 90;
          position.long %= 180;

          op.latitude = position.lat;
          op.longitude = position.long;
          return op;
        });
       await addList("pha",arrayWithPos);

        return res
          .status(200)
          .send({
            status: 'success',
           arrayWithPos
          })

  },

  getAsteroids: (req, res) => {

    // Find 
    Asteroid.find({}).exec((err, asteroids) => {

      if(err){
        return res
          .status(500)
          .send({
            status: 'error',
            message: 'Error al cargar los asteroides'
          })
      }else if(!asteroids){
        return res
          .status(404)
          .send({
            status: 'error',
            message: 'No hay asteroides para mostrar'
          })
      }

          return res
            .status(200)
            .send({
              status: 'success',
              asteroids
            })

    })
  },

  getAsteroid: (req, res) => {

    // Recoger el id de la url
    const asteroidId = req.params.id;

    // Comprobar que existe
    if(!asteroidId || asteroidId === null){
      return res.status(400).send({
        status: 'error',
        message: 'Se necesita introducir un identificador para buscar un asteroide en la base de datos'
      })
    }
    // Buscar el asteroide
    Asteroid.findById(asteroidId, (err, asteroid) => {
      if(err || !asteroidId){
        return res
          .status(500)
          .send({
            status: 'error',
            message: 'El asteroide no existe o no se ha podido conectar con la base de datos'
          })
      }

      // Devolverlo en json
       return res
        .status(200)
        .send({
          status: 'success',
          asteroid: asteroid
        });
    })

  },

  update: (req, res) => {

    // Recoger el id del art??culo por la URL
    const asteroidId = req.params.id;

    // Recoger los datos que llegan por PUT
    const params = req.body;

    // Validar los datos
    try{
       const validate_full_name = !validator.isEmpty(params.full_name);
      const validate_a = !validator.isEmpty(params.a);
      const validate_e = !validator.isEmpty(params.e);
      const validate_i = !validator.isEmpty(params.i);
      const validate_om = !validator.isEmpty(params.om);
      const validate_w = !validator.isEmpty(params.w);
      const validate_ma = !validator.isEmpty(params.ma);

      if(validate_full_name && validate_a && validate_e && validate_i && validate_om && validate_w && validate_ma){
        // Find and update
        Asteroid.findOneAndUpdate({_id: asteroidId}, params, {new:true}, (err, asteroidUploaded) => {
          if(err){
            return res
              .status(500)
              .send({
                status: 'error',
                message: 'No se ha podido conectar con la base de datos'
              })
          }else if(!asteroidUploaded){
            return res
              .status(404).send({
                status: 'error',
                message: 'No existe el asteroide'
              })
          }
          // Find and Update
          return res.status(400).send({
            status: 'success',
            asteroid: asteroidUploaded
          })
        })
      }
    }catch{
      return res
        .status(404).send({
          status: 'error',
          message: 'No existe el asteroide'
        })
    }
  },

  delete: (req, res) => {

    // Recoger el ID de la URL 
    const asteroidId = req.params.id;

    // Find and Delete
    Asteroid.findOneAndDelete({_id: asteroidId}, (err, asteroidRemoved) => {
      if(err){
        return res
          .status(500)
          .send({
            status: 'error',
            message: 'Error en la petici??n'
          })
      }
      if(!asteroidRemoved){
        return res
          .status(400)
          .send({
            status: 'error',
            message: 'El asteroide no existe'
          });
      }
      return res
        .status(404).send({
          status: 'success',
          asteroid: asteroidRemoved
        })
    })
  },

  search: (req, res) => {
    // Sacar el string
    const searchString = req.params.search;

    // Find or
    Asteroid.find({ "$or": [
      {"full_name": {"$regex": searchString, "$options": "i"}} ]})
    .exec((err, asteroids) => {

      if(err || !asteroids || asteroids === null || asteroids.length < 1){
         return res
          .status(404)
          .send({
            status: 'err', err,
            message: 'La petici??n no existe'
      })
      }

      return res
      .status(200)
      .send({
        status: 'success',
        asteroids
      })
    })

  }
};

module.exports = controller;