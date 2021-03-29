const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let connection = require("./connection-wrapper");

async function getAllCategories() {
    let sql = `SELECT * FROM categories`;
    let categories;

    try {
        categories = await connection.execute(sql);
    }
    catch (error) {
        // TECHNICAL ERROR HAD OCCURED
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
    }

    return categories;
}

module.exports = {
    getAllCategories
};