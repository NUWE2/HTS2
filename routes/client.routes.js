'use strict'
// , getClient, update, delete, search
const express = require('express');
const clientRoutes = require('../controllers/clientController');

const router = express.Router();

// Rutas
router.get('/clients', clientRoutes.getAllClients);
// router.get('/clients/:id', getClient);
// router.put('/clients/:id', update);
// router.delete('/clients/:id', delete);
// router.get('/clients/search/:search', search)

module.exports = router;