const hbs = require('hbs');

// Registering custom Handlebars
hbs.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

hbs.registerHelper('getPrice', function(price, qty) {
    return (parseFloat(price) * parseInt(qty));
});