let cartsLogic = require("../logic/carts-logic");
let cache = require("./cache-controller");
const express = require("express");

const router = express.Router();

// Get open cart
// GET http://localhost:3001/carts
router.get("/", async (request, response, next) => {
    let userId = cache.extractUserDataFromCache(request).id;

    try {
        let cart = await cartsLogic.getOpenCart(userId);
        response.json(cart);
    }
    catch (error) {
        return next(error); 
    }
});

// Create new cart
// POST http://localhost:3001/carts
router.post("/", async (request, response, next) => {
    let userId = cache.extractUserDataFromCache(request).id;

    try {
        let cartId = await cartsLogic.createNewCart(userId);
        response.json(cartId);
    }
    catch (error) {
        return next(error); 
    }
});

// Get open cart's items
// GET http://localhost:3001/carts/products/:id
router.get("/products/:id", async (request, response, next) => {
    let cartId = request.params.id;

    try {
        let cartItems = await cartsLogic.getCartItems(cartId);
        response.json(cartItems);
    }
    catch (error) {
        return next(error); 
    }
});

module.exports = router;