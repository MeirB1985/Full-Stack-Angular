const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require("./mongodb-access");

const UserModel = require("../models/user-model");

async function getAllUsers() {
    return await UserModel.find().exec();
}

async function addUser(user) {
    user.save();
    return user;
}

async function deleteUser(_id) {
    const result = await UserModel.deleteOne({ _id }).exec();
    return result.deletedCount === 1 ? true : false;
}

module.exports = {
    addUser,
    getAllUsers,
    deleteUser
}