const mongooseError = require('mongoose').Error;

class ServiceError extends Error {
    constructor(message, statusCode, errorCode) {
        if (arguments.length === 1 && message instanceof mongooseError) {
            const err = arguments[0];
            super(message);
            this.convertMongooseError(err);
            return;
        }

        let isObj = typeof message === 'object';

        if (isObj) {
            message = message.message;
            statusCode = message.statusCode;
        }

        super(message);

        this.statusCode = statusCode || 500;
        this.errors = [];

        if (!errorCode) {
            console.error('missing errorCode for ' + message);
        }

        this.errorCode = errorCode;
    }

    convertMongooseError(err) {
        this.errors = err.errors;
        this.errorCode = err.name;
        this.statusCode = statusCodes.BAD_REQUEST;
    }
}

const statusCodes = {
    SUCCESS: 200,
    RESOURCE_CREATED: 201,
    RESOURCE_UPDATED: 204,
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    METHOD_NOT_ALLOWED: 405,
    INTERNAL_SERVER_ERROR: 500
};

const errorCodes = {
    ERROR_SERVER: 'error_server',
    ERROR_SAVE_TO_DB: 'error_save_to_db'

};

module.exports = ServiceError;
module.exports.STATUS = statusCodes;
module.exports.CODE = errorCodes;
