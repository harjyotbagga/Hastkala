const chalk = require('chalk');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const login = async (login_creds) => {
    return new Promise(async (resolve, reject) => {
        // console.log(login_creds);
        try {
            const user = await User.findByCredentials(login_creds.email, login_creds.password);
            const token = await user.generateAuthToken();
            console.log(chalk.green('User Logged in!'));
            resolve(token);
        } catch (e) {
            console.log(chalk.red(`ERROR: ${e}`));
            reject(e);
        }
    });
}

const logout = async (auth_token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const decoded_token = jwt.verify(auth_token, process.env.JSON_SECRET_TOKEN);
            const user = await User.findOne({_id: decoded_token._id, 'tokens.token': auth_token});
            user.tokens = user.tokens.filter((token) => {
                return token.token !== auth_token;
            });
            await user.save();
            console.log(chalk.green('User Logged Out!'));
            resolve();
        } catch (e) {
            console.log(chalk.red(`ERROR: ${e}`));
            reject(e);
        }
    });
}

const createUser = async (user_details) => {
    return new Promise(async (resolve, reject) => {
        // console.log(user_details);
        try {
            const user = User(user_details);
            await user.save();
            // TODO: If user already exists
            token = await user.generateAuthToken();
            console.log(chalk.green('User Created!'));
            resolve('User Added');
        } catch (e) {
            console.log(chalk.red(`ERROR: ${e}`));
            reject(e);
        }
    }); 
}

module.exports = {
    login,
    logout,
    createUser,

}