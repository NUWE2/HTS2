'use strict'

const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
const passport = require('passport')

// Rutas
router.post('/signup', authController.signup );
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers);
router.get('/users/:id', authController.getUser);
router.put('/users/:id', authController.update);
router.delete('/users/:id', authController.delete);
router.get('/users/search/:search', authController.search)
router.get('/user/oauth2/github', passport.authenticate('github'))
router.get('/user/oauth2/github/callback',
    passport.authenticate('github', { failureRedirect: '/login'}),
    (req, res, next) => {
        res.status(200).send('logged in with github')
    })

module.exports = router;