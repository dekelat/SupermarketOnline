const ServerError = require("../errors/server-error");
const ErrorType = require("../errors/error-type");
const usersDao = require("../dao/users-dao");
const cache = require("../controllers/cache-controller");

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const RIGHT_SALT = "ksdjfhbAWEDCAS29!@$addlkmn";
const LEFT_SALT = "32577098ASFKJkjsdhfk#$dc";

async function login(loginDetails) {

    if (loginDetails.email == null || loginDetails.password == null) {
        throw new ServerError(ErrorType.MISSING_REQUIRED_FIELDS);
    }

    // Encrypt password 
    loginDetails.password = crypto.createHash("md5").update(
        LEFT_SALT + loginDetails.password + RIGHT_SALT).digest("hex");
    let userData = await usersDao.login(loginDetails);

    // Create user's token
    let saltedEmail = LEFT_SALT + userData.email + RIGHT_SALT;
    const token = jwt.sign({ sub: saltedEmail }, config.secret);
    cache.put(token, userData);

    let response = { token: "Bearer " + token, userType: userData.userType,
        userName: userData.firstName + " " + userData.lastName };
    
    return response;
}

async function addUser(user) {

    if (user.id == null || user.email == null || user.password == null || 
        user.userType == null || user.firstName == null || user.lastName == null) {
        throw new ServerError(ErrorType.MISSING_REQUIRED_FIELDS);
    }

    // Validate user id doesn't exist already
    if (await usersDao.isUserExistById(user.id)) {
        throw new ServerError(ErrorType.ID_ALREADY_EXIST);
    }

    // if (!isEmailValid(user.email)) {
    //     throw new ServerError(ErrorType.INVALID_EMAIL);
    // }

    // Validate email doesn't exist
    if (await usersDao.isUserExistByEmail(user.email)) {
        throw new ServerError(ErrorType.EMAIL_ALREADY_EXIST);
    }

    user.password = crypto.createHash("md5").update(
        LEFT_SALT + user.password + RIGHT_SALT).digest("hex");

    await usersDao.addUser(user);
}

function isEmailValid(email) {
    return /^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$/.test(email)
}

function createUserSession(userData){
    let saltedEmail = LEFT_SALT + userData.email + RIGHT_SALT;
    const token = jwt.sign({ sub: saltedEmail }, config.secret);

    cache.put(token, userData);

    let response = { token: "Bearer " + token, userType: userData.userType, email: userData.email, 
        firstName: userData.firstName, lastName: userData.lastName, city: userData.city, 
        street: userData.street };

    return response;
}

async function getUsersStreet(id) {
    let street = await usersDao.getUsersStreet(id);
    return street;
}

async function getUsersCity(id) {
    let city = await usersDao.getUsersCity(id);
    return city;
}

module.exports = {
    login,
    addUser,
    getUsersCity,
    getUsersStreet
};