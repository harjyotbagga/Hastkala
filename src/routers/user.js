const { request } = require('express');
const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const router = new express.Router();

router.get('/profile', AuthMiddleware, (req, res) => {
    // console.log(req.user);
    var user = req.user;
    var name = user.first_name + user.last_name;
    var email = user.email;
    var err = req.query.err || '';
    res.render('profile', {
        name,
        email,
        err
    });
});

// TODO: Post methods for storing details & changing passwords

module.exports = router;