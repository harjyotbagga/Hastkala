const express = require('express');
const router = new express.Router();
const UserController = require('../controllers/user');
const User = require('../models/user');

router.get('/login', (req, res) => {
    login_error = false;
    if (req.query.user_created===true) {
        user_registered=true;
    } else {
        user_registered=false;
    }
    res.render('login', {
        user_registered,
        login_error
    });
});

router.post('/login', async (req, res) => {
    UserController.login(req.body)
        .then((resp) => {
            res.redirect('/');
        })
        .catch((e)=> {
            login_error = true;
            user_registered = false
            res.render('login', {
                user_registered,
                login_error,
            });
        });
});


router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        user_exists=true;
        res.render('register', {
            user_exists
        });
    } else {
        UserController.createUser(req.body)
            .then((resp) => {
                res.redirect('login?user_created=true');
            })
            .catch((e) => {
                res.render('error', {
                    error_code: 500
                });
            });
    }
});

module.exports = router;