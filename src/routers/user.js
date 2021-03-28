const express = require('express');
const router = new express.Router();

router.get('/profile', (req, res) => {
    res.render('profile', {});
});


module.exports = router;