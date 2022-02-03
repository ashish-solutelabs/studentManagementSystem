const { fs } = require("fs");
const { student } = require("./validationSchema");



module.exports = {
    addStudentValidation: async(req, res, next) => {
        const value = await student.validate(req.body);
        if (value.error || paramValue.error) {
            res.json({
                success: false,
                message: value.error.details[0].message
            })
        } else {
            next();
        }
    },

}