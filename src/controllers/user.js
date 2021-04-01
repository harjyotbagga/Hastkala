const chalk = require('chalk');
const User = require('../models/user');

const createUser = async (user_details) => {
    return new Promise(async (resolve, reject) => {
        console.log(user_details);
        try {
            const user = User(user_details);
            await user.save();
            token = await user.generateAuthToken();
            console.log(chalk.green('User Created!'));
            // console.log(chalk.green(user));
            resolve('User Added');
        } catch (e) {
            console.log(chalk.red(`ERROR: ${e}`));
            reject(e);
        }
    }); 
}

module.exports = {
    createUser,

}