const express = require('express');
const router = new express.Router();
const cookieParser = require('cookie-parser');
const AuthController = require('../controllers/auth');
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
    AuthController.login(req.body)
        .then((token) => {
            res.cookie('auth_token', token, {httpOnly: true});
            res.redirect('/products');
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
        AuthController.createUser(req.body)
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

router.get('/logout', (req, res) => {
    AuthController.logout(req.cookies.auth_token)
        .then((resp) => {
            res.clearCookie('auth_token');
            res.redirect('/');
        })
        .catch((e) => {
            res.render('error', {
                error_code: 500
            }); 
        });
});

router.get('/status', async (req, res) => {
    var usr = '';
    if (req.cookies.auth_token) {
        jwt = require('jsonwebtoken');
        const token = req.cookies.auth_token;
        const decoded_token = jwt.verify(token, process.env.JSON_SECRET_TOKEN);
        const user = await User.findOne({_id: decoded_token._id, 'tokens.token': token});
        usr = user;
        // console.log(user)
    }
    res.send({
        'Headers': req.headers,
        'cookies': req.cookies,
        usr
    });
});

module.exports = router;