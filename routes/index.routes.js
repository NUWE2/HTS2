// Modulos
const express = require('express');

// Express
const app = express();

// Ficheros
const phaRoutes = require('./pha.routes');
const clientRoutes = require('./client.routes');

// Rutas
app.use('/api', phaRoutes);
app.use('/', clientRoutes);

