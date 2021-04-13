const usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();

// Login
// POST http://localhost:3001/users/login
router.post("/login", async (request, response, next) => {
    let loginDetails = request.body;

    try {
        let successfulLoginData = await usersLogic.login(loginDetails);
        response.json(successfulLoginData);
    }
    catch (error) {
        return next(error); 
    }
});

// Sign up (add user)
// POST http://localhost:3001/users/
router.post("/", async (request, response, next) => {
    let userDetails = request.body;

    try {
        await usersLogic.addUser(userDetails);
        response.json();
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;