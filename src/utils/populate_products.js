const Product = require('../models/product');

const products = [
    {
        name: 'Twelve Blends- Spice Box With 12 Containers & Spoon In Sheesham Wood',
        price: 1890,
        quantity: 5,
        vendor: "Spice Club",
    },
    {
        name: 'Thirteen Blends- Spice Box With 12 Containers & Spoon In Sheesham Wood',
        price: 1600,
        vendor: "Spice Club",
    },
    {
        name: 'Fourteen Blends- Spice Box With 12 Containers & Spoon In Sheesham Wood',
        price: 1800,
        vendor: "Spice Club",
    },

]

const populate_products = async () => {
    try {
        products.every(async (product_values) => {
            var product = Product(product_values);
            await product.save();
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }

}

populate_products();