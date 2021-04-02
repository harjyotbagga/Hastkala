const jwt = require('jsonwebtoken');
const cookiesParser = require('cookie-parser');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.auth_token;
        const decoded_token = jwt.verify(token, process.env.JSON_SECRET_TOKEN);
        const user = await User.findOne({_id: decoded_token._id, 'tokens.token': token});
        if (!user) {
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.render('login', {
            not_authenticated: true
        })
    }
}

module.exports = auth;