const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let ordersDao = require("../dao/orders-dao");

async function getTotalNumberOfOrders() {
    let numberOfOrders = await ordersDao.getTotalNumberOfOrders();
    return numberOfOrders;
}

async function createNewOrder(order) {
    await ordersDao.createNewOrder(order);
}

async function getLatestOrder(userId) {
    let latestOrder = await ordersDao.getLatestOrder(userId);
    return latestOrder;
}

module.exports = {
    getTotalNumberOfOrders,
    createNewOrder,
    getLatestOrder
};