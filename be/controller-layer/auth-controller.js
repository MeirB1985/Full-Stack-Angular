const express = require("express");
const UserModel = require("../models/user-model");
const auth_dal = require("../data-access-layer/auth-dal");
const router = express.Router();

// REGISTER
router.post("/register", async (request, response) => {
    
    try {
        const user = new UserModel(request.body);
        const registeredUser = await auth_dal.register(user);
        response.json(registeredUser);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

// LOGIN
router.post("/login", async (request, response) => {

    try {
        const user = new UserModel(request.body);
        const loggedInUser = await auth_dal.login(user);
        if (!loggedInUser) {
            response.status(401).send("Credentials incorrect!");
            return;
        }
        response.json(loggedInUser);
    } catch(err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;