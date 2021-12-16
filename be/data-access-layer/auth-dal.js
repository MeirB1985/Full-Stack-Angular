const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");

async function login(user) {
    const loggedInUser = await UserModel.findOne({email: user.email, password: user.password}).exec();

    if (!loggedInUser) {
        return null;
    }

    loggedInUser.token = jwt.sign({ loggedInUser }, config.jwtKey, { expiresIn: "30m" });
    delete loggedInUser.password;
    return loggedInUser;
}

async function register(user) {
    user.save();
    user.token = jwt.sign({ user }, config.jwtKey, { expiresIn: "30m" });
    delete user.password;
    return user;
}

module.exports = {
    login,
    register
}