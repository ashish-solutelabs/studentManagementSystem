const { object } = require('@hapi/joi');
const joi = require('@hapi/joi');

const schema = {
    student: joi.object({
        firstName: joi.string().lowercase().max(50),
        lastName: joi.string().lowercase().max(50),
        email: joi.string().lowercase().email(),
        gender: joi.string().lowercase().valid("male", "female", "Male", "Female"),
        mobileNumber: joi.number().integer().min(1000000000).message("Invalid Mobile Number").max(9999999999).message("Invalid Mobile Number"),
        address: joi.string().max(50),
        branch: joi.string().uppercase().valid("IT", "ME", "EE", "EC", "CE")
    })
};
module.exports = schema;