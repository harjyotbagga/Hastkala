const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

JSON_SECRET_TOKEN = process.env.JSON_SECRET_TOKEN;

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email Address");
            }
        },
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        length: 10,
    },
    shipping: [{
        'shipping_info': {
            'address': {
                type: String,
                required: true
            },
            'city': {
                type: String
            },
            'state': {
                type: String
            },
            'country': {
                type: String
            },
            'pin': {
                type: Number,
                length: 6
            }
        }
    }],
    cart: [{
        'product': {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        'qty': {
            type: Number,
            default: 1
        }
    }],
    tokens: [{
        'token': {
            type: String,
            unique: true,
            required: true,
        }
    }]
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, JSON_SECRET_TOKEN);
    // console.log(user);
    // console.log(user.tokens);
    // console.log(token)
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email }); 
    if (!user) {
        throw new Error('Unable to login.');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login.');
    }
    return user;
}

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    user.password = await bcrypt.hash(user.password, 8);
    next();
});

userSchema.pre('remove', async function (next) {
    const user = this;
    // Cascading
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;