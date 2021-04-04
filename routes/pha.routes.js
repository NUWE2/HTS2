'use strict'

const express = require('express');
const phaController = require('../controllers/phaController');

const router = express.Router();


const passport = require('passport')

const protectedRoute = passport.authenticate('jwt', { session: false })

// Rutas
router.get('/asteroids/save-asteroids-from-csv', phaController.saveAsteroidsFromCSV);
router.post('/asteroids/save', protectedRoute, phaController.save);
router.get('/asteroids', protectedRoute, phaController.getAsteroids);
router.get('/asteroids/:id', protectedRoute, phaController.getAsteroid);
router.put('/asteroids/:id', protectedRoute, phaController.update);
router.delete('/asteroids/:id', protectedRoute, phaController.delete);
router.get('/asteroids/search/:search', protectedRoute, phaController.search);

module.exports = router;