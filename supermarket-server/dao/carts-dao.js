const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");

async function getOpenCart(userId) {
    let sql = `SELECT id, date_created AS dateCreated
                FROM carts
                WHERE user_id = ? AND id NOT IN (SELECT cart_id FROM orders)`;
    let parameters = [userId];
    let cart;

    try {
        cart = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(order), error);
    }

    return cart;
}

async function createNewCart(userId) {
    let sql = `INSERT INTO carts (user_id, date_created) 
                VALUES (?, CURRENT_DATE())`;
    let parameters = [userId];
    let cartId;

    try {
        cartId = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
    
    return cartId.insertId;
}

async function getCartItems(cart) {
    let sql = `SELECT 
                    product_id AS productId,
                    name,
                    image_url AS imageUrl,
                    quantity,
                    price
                FROM
                    cart_items ci
                        JOIN
                    products p ON ci.product_id = p.id
                WHERE
                    cart_id = ?`;
    let parameters = [cart];
    let cartItems;

    try {
        cartItems = await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }
    
    return cartItems;
}

module.exports = {
    getOpenCart,
    createNewCart,
    getCartItems
};