let ErrorType = {

    GENERAL_ERROR: { 
        id: 1, 
        httpCode: 600, 
        message: "General Error", 
        isShowStackTrace: true 
    },

    EMAIL_ALREADY_EXIST: { 
        id: 2, 
        httpCode: 601, 
        message: "An account associated with email already exists", 
        isShowStackTrace: false 
    },

    ID_ALREADY_EXIST: { 
        id: 3, 
        httpCode: 602, 
        message: "An account associated with this id already exists", 
        isShowStackTrace: false 
    },

    UNAUTHORIZED_LOGIN: { 
        id: 4, 
        httpCode: 401, 
        message: "Login failed, invalid user name or password", 
        isShowStackTrace: false 
    },

    USER_DOSENT_EXIST: { 
        id: 5, 
        httpCode: 603, 
        message: "User doesn't exist", 
        isShowStackTrace: false 
    },

    INVALID_EMAIL: { 
        id: 6, 
        httpCode: 604, 
        message: "Invalid email address", 
        isShowStackTrace: false 
    },

    MISSING_REQUIRED_FIELDS: { 
        id: 7, 
        httpCode: 605, 
        message: "Missing required fields", 
        isShowStackTrace: false 
    },
    
    UNAUTHORIZED_ACTION: { 
        id: 8, 
        httpCode: 606, 
        message: "You are unauthorized to execute this action", 
        isShowStackTrace: false 
    }
}

module.exports = ErrorType;