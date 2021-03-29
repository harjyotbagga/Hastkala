const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});

// require('./populate_products'); 