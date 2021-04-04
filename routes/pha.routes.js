'use strict'

const express = require('express');
const phaController = require('../controllers/phaController');

const router = express.Router();

// Rutas
router.get('/asteroids/save-asteroids-from-csv', phaController.saveAsteroidsFromCSV);
router.post('/asteroids/save', phaController.save);
router.get('/asteroids', phaController.getAsteroids);
router.get('/asteroids/:id', phaController.getAsteroid);
router.put('/asteroids/:id', phaController.update);
router.delete('/asteroids/:id', phaController.delete);
router.get('/asteroids/search/:search', phaController.search);

module.exports = router;