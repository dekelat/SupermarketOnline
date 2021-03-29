const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let categoriesDao = require("../dao/categories-dao");

async function getAllCategories() {
    let categories = await categoriesDao.getAllCategories();
    return categories;
}

module.exports = {
    getAllCategories
};