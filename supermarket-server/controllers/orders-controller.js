let ordersLogic = require("../logic/orders-logic");
let cache = require("./cache-controller");
const express = require("express");

const router = express.Router();

// Get number of all the orders ever made
// GET http://localhost:3001/orders/count
router.get("/count", async (request, response, next) => {
    try {
        let numberOfOrders = await ordersLogic.getTotalNumberOfOrders();
        response.json(numberOfOrders);
    }
    catch (error) {
        return next(error); 
    }
});

// Create new order
// POST http://localhost:3001/orders/
router.post("/", async (request, response, next) => {
    let order = request.body;

    try {
        await ordersLogic.createNewOrder(order);
        response.json();
    }
    catch (error) {
        return next(error); 
    }
});

// Get customer's latest order
// GET http://localhost:3001/orders/
router.get("/", async (request, response, next) => {
    let userId = cache.extractUserDataFromCache(request).id;

    try {
        let latestOrder = await ordersLogic.getLatestOrder(userId);
        response.json(latestOrder);
    }
    catch (error) {
        return next(error); 
    }
});

module.exports = router;