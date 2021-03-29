const ErrorType = require("../errors/error-type");
const ServerError = require("../errors/server-error");
let productsDao = require("../dao/products-dao");

async function getAllProducts() {
    let products = productsDao.getAllProducts();
    return products;
}

async function getProductsByCategory(categoryId) {
    let products = await productsDao.getProductsByCategory(categoryId);
    return products;
}

async function getNumberOfProducts() {
    let numberOfProducts = productsDao.getNumberOfProducts();
    return numberOfProducts;
}

async function addProduct(product, userType) {

    if (userType != "ADMIN"){
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    if (!product.name || !product.categoryId ||
        !product.unitPrice || !product.imageUrl) {
        throw new ServerError(ErrorType.MISSING_REQUIRED_FIELDS);
    }

    await productsDao.addProduct(product);

    // Broadcast changes to logged in users
}

async function updateProduct(product, userType) {

    if (userType != "ADMIN"){
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    if (!product.id || !product.name || !product.categoryId ||
        !product.unitPrice || !product.imageUrl) {
        throw new ServerError(ErrorType.MISSING_REQUIRED_FIELDS);
    }

    await productsDao.updateProduct(product);

    // Broadcast changes to logged in users
}

async function deleteProduct(productId, userType) {

    if (userType != "ADMIN"){
        throw new ServerError(ErrorType.UNAUTHORIZED_ACTION);
    }

    await productsDao.deleteProduct(productId);

    // Broadcast changes to logged in users
}

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getNumberOfProducts,
    addProduct,
    updateProduct,
    deleteProduct
};