const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    vendor: {
        type: String,
        trim: true
    },
    info: {
        material: {
            type: String,
            default: 'Sheesham Wood'
        },
        dimensions: {
            type: String,
            default: 'SPICE BOX: (L * W * H) = (9.9 * 7.7 * 2.1), CONTAINERS: (L * W * H) = (2.2 * 2.2 * 1.1), SPOON: (L * W ) = (5.5 * 0.9) Inch'
        },
        art_type: {
            type: String,
            default: 'The Spice Box is Handcrafted in Sheesham Wood and Polished with Food Safe Lacquer'
        },
        capacity: {
            type: String,
            default: 'Each Container: 45 ML'
        }
    },
    // Comments, Rating and images
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;