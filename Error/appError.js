class ApiError extends Error {
    constructor(code, message) {
        super(message);
        this.statusCode = code;
        this.isOperational = true; // custom error no use 

        Error.captureStackTrace(this, this.constructor);
    }
}


module.exports = ApiError;