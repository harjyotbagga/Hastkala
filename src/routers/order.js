const express = require('express');
const router = new express.Router();

router.get('/orders', (req, res) => {
    res.render('orders', {});
});

router.get('/completed', (req, res) => {
    res.render('order_completed');
});

router.get('/invoice', (req, res) => {
    res.render('invoice', {});
});


module.exports = router;