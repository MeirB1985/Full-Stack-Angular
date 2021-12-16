const express = require("express");
const user_dal = require("../data-access-layer/user-dal");
const UserModel = require("../models/user-model");
const router = express.Router();

// GET ALL
router.get("", async (request, response) => {
    try {
        const users = await user_dal.getAllUsers();
        response.json(users);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// POST
router.post("", async (request, response) => {
    try {
        const userModel = new UserModel(request.body);
        const errorMessages = userModel.validateSync();

        if (errorMessages) {
            response.status(400).send(errorMessages);
            return;
        }

        const newUser = await user_dal.addUser(userModel);
        response.status(201).json(newUser);
    } catch(err) {
        console.log(err);
    }
});

// DELETE
router.delete("/:id", async (request, response) => {
    try {
        const id = request.params.id;
        const result = await user_dal.deleteUser(id);

        if (!result) {
            response.status(404).send(`User with ID ${id} doesn't exist.`);
            return;
        }
        response.sendStatus(204);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;