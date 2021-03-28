const express = require('express');
const router = new express.Router();

router.get('/products', (req, res) => {
    res.render('products', {
        product_list: [
            {
                name: 'abc'
            },
            {
                name: 'xyz'
            },
        ]
    });
});

router.get('/product', (req, res) => {
    res.render('product_page', {
        
    });
});

module.exports = router;