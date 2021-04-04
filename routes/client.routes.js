'use strict'
// , getClient, update, delete, search
const express = require('express');
const clientRoutes = require('../controllers/clientController');

const router = express.Router();

const passport = require('passport')

const protectedRoute = passport.authenticate('jwt', { session: false })

// Rutas
router.get('/clients', protectedRoute, clientRoutes.getAllClients);
router.get('/save-clients-from-csv', protectedRoute, clientRoutes.saveClientsFromCSV);
router.get('/clients/:id', protectedRoute,  clientRoutes.getClient);
// router.put('/clients/:id', update);
// router.delete('/clients/:id', delete);
// router.get('/clients/search/:search', search)

module.exports = router;