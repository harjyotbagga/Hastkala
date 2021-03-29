const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/hastkala', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

// require('./populate_products');