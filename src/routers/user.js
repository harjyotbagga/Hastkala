const express = require('express');
const AuthMiddleware = require('../middleware/auth');
const router = new express.Router();

router.get('/profile', AuthMiddleware, (req, res) => {
    res.render('profile', {});
});


module.exports = router;