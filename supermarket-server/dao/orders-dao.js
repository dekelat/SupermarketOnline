const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");

async function getTotalNumberOfOrders() {
    let sql = `SELECT COUNT(*) AS count FROM orders`;
    let numberOfOrders;

    try {
        numberOfOrders = await connection.execute(sql);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }

    return numberOfOrders[0];
}

async function createNewOrder(order) {
    let sql = `INSERT INTO orders 
                    (cart_id, 
                    total_price, 
                    city, 
                    street, 
                    order_date, 
                    delivery_date, 
                    payment_method) 
                VALUES (?, ?, ?, ?, CURRENT_DATE(), DATE(?), ?)`;
    let parameters = [order.cartId, order.totalPrice, order.city,
        order.street, order.deliveryDate, order.paymentMethod];

    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(order), error);
    }
}

async function getLatestOrder(userId) {
    let sql = `SELECT 
                    o.id,
                    cart_id AS cartId,
                    total_price AS totalPrice,
                    city,
                    street,
                    order_date AS orderDate,
                    delivery_date AS deliveryDate,
                    payment_method AS paymentMethod
                FROM
                    orders o
                        JOIN
                    carts c ON o.cart_id = c.id
                WHERE
                    user_id = ?
                ORDER BY order_date DESC
                LIMIT 1`;
    let parameters = [userId];
    let order;

    try {
        order = await connection.executeWithParameters(sql, parameters);
    }
    catch(error) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }

    return order[0];
}

module.exports = {
    getTotalNumberOfOrders,
    createNewOrder,
    getLatestOrder
};