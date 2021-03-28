const express = require('express');
const router = new express.Router();

router.get('/shipping', (req, res) => {
    res.render('shipping', {
        
    });
});

router.get('/shipinfo', (req, res) => {
    res.render('shipinfo', {
        
    });
});

router.get('/payment', (req, res) => {
    res.render('payment', {
        
    });
});

router.get('/cart', (req, res) => {
    res.render('cart', {
        
    });
});

module.exports = router;