const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user');

router.get('/login', (req, res) => {
    if (req.query.user_created===true) {
        user_registered=true;
    } else {
        user_registered=false;
    }
    res.render('login', {
        user_registered,
    });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/login', async (req, res) => {
    
});

router.post('/register', async (req, res) => {
    UserController.createUser(req.body)
        .then((resp) => {
            res.redirect('login?user_created=true');
        })
        .catch((e) => {
            res.render('error', {
                error_code: 500
            });
        });
});

module.exports = router;