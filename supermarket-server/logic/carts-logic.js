const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const cartsDao = require("../dao/carts-dao");

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

async function addItemToCart(userType, cartId, product) {

    if(userType == "ADMIN") {
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    await cartsDao.addItemToCart(cartId, product);
}

async function deleteItemFromCart(userType, cartId, productId) {

    if(userType == "ADMIN") {
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    await cartsDao.deleteItemFromCart(cartId, productId);
}

async function emptyCart(userType, cartId) {

    if(userType == "ADMIN") {
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    await cartsDao.emptyCart(cartId);
}

async function updateCartItem(userType, product, cartId) {

    if(userType == "ADMIN") {
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    await cartsDao.updateCartItem(product, cartId);
}

module.exports = {
    getOpenCart,
    createNewCart,
    getCartItems,
    addItemToCart,
    deleteItemFromCart,
    emptyCart,
    updateCartItem
};