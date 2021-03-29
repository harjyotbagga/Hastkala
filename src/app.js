const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('./db/mongoose');

const authRouter = require('./routers/auth');
const indexRouter = require('./routers/index');
const productRouter = require('./routers/product');
const cartRouter = require('./routers/cart');
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');

const app = express();
const PORT = process.env.PORT;

// Defining paths
const PUBLIC_DIR_PATH = path.join(__dirname, '../public');
const VIEWS_PATH = path.join(__dirname, '../templates/views');
const PARTIALS_PATH = path.join(__dirname, '../templates/partials');

// Setting up Handlebars engines and paths
app.set('view engine', 'hbs');
app.set('views', VIEWS_PATH);
hbs.registerPartials(PARTIALS_PATH);

// Serving static files
app.use(express.static(PUBLIC_DIR_PATH));

// Registering routers
app.use(authRouter);
app.use(indexRouter);
app.use(productRouter);
app.use(cartRouter);
app.use(userRouter);
app.use(orderRouter);


app.listen(PORT, () => {
    console.log(`Server is up and running on PORT ${PORT}`);
});