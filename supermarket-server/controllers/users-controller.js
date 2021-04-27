const usersLogic = require("../logic/users-logic");
let cache = require("./cache-controller");
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

// Get the user's street
// GET http://localhost:3001/users/street
router.get("/street", async (request, response, next) => {
    let id = cache.extractUserDataFromCache(request).id;

    try {
        let street = await usersLogic.getUsersStreet(id);
        response.json(street);
    }
    catch (error) {
        return next(error);
    }
});

// Get the user's city
// GET http://localhost:3001/users/city
router.get("/city", async (request, response, next) => {
    let id = cache.extractUserDataFromCache(request).id;

    try {
        let city = await usersLogic.getUsersCity(id);
        response.json(city);
    }
    catch (error) {
        return next(error);
    }
});

module.exports = router;