const express = require('express');
const router = new express.Router();
const User = require('../models/user');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/login', async (req, res) => {
    const user = User(req.body);
    try {
        console.log(user);
        res.status(201).send();
    } catch (e) {
        res.send(e);
    }
});

router.post('/register', async (req, res) => {
    const user = User(req.body);
    try {
        console.log(user);
        res.status(201).send();
    } catch (e) {
        res.send(e);
    }
});

module.exports = router;