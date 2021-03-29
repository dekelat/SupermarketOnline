const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let cartsDao = require("../dao/carts-dao");

async function getOpenCart(userId) {
    let cart = await cartsDao.getOpenCart(userId);
    return cart;
}

async function createNewCart(userId) {
    let cartId = await cartsDao.createNewCart(userId);
    return cartId;
}

async function getCartItems(cartId) {
    let cartItems = await cartsDao.getCartItems(cartId);
    return cartItems;
}

module.exports = {
    getOpenCart,
    createNewCart,
    getCartItems
};