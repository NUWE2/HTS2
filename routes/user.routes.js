'use strict'

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Rutas
router.post('/signup', authController.signup );
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers);
router.get('/users/:id', authController.getUser);
router.put('/users/:id', authController.update);
router.delete('/users/:id', authController.delete);
router.get('/users/search/:search', authController.search)

module.exports = router;