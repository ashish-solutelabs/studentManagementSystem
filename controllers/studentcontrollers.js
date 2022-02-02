var express = require('express')();
var fs = require('fs');
const createError = require('http-errors')
const path = require('path');
const saveData = require('../db/modelSaveData')
const ApiError = require('../Error/appError');
const catchAsync = require('../Error/catchAsync');


var studentsData = JSON.parse(fs.readFileSync(path.join(__dirname, "../db/student.json"), 'utf-8'));


exports.getStudent = async(req, res, next) => {
    try {
        if (!studentsData) {
            throw new ApiError(502, "Database is not connected to server")
        }
        return res.json({
            success: 1,
            data: studentsData,
        })
    } catch (e) {
        next(e);
    }
};


exports.getStudentByBranch = async(req, res, next) => {
    try {
        if (!studentsData) {
            throw new ApiError(502, "Database is not connected to server")

        } else {
            let branch = (req.params.branch).toUpperCase();

            if (branch === "IT" || branch === "IT" || branch === "IT" || branch === "IT") {
                throw new ApiError(404, "Your Branch is invalid");
            }
            let students = await studentsData.filter(student => student.branch == branch);


            if (students.length != 0) {
                return res.json({
                    success: 1,
                    data: students,
                })
            } else {
                throw new ApiError(404, "Record Doesn't Found");
            }
        }
    } catch (e) {
        next(e);
    }
}


exports.getStudentByName = async(req, res, next) => {
    try {
        if (!studentsData) {
            throw new ApiError(502, "Database is not connected to server")
        }

        let firstName = req.params.firstName

        let students = await studentsData.filter(student => student.firstName == firstName);

        if (students.length != 0) {
            return res.json({
                success: 1,
                data: students,
            });
        } else {
            throw new ApiError(404, "Record Doesn't Found");
        }
    } catch (e) {
        next(e);
    }
}


exports.getStudentByEmail = async(req, res, next) => {
    try {
        if (!studentsData) {
            throw new ApiError(502, "Database is not connected to server")
        }

        let email = req.params.email
        let students = await studentsData.filter(student => student.email == email);

        if (students.length != 0) { // student 
            return res.json({
                success: 1,
                data: students,
            })
        } else {
            throw new ApiError(404, "Record Didn't Match");
        }
    } catch (e) {
        next(e)
    }
}


exports.getStudentById = async(req, res, next) => {
    try {
        if (!studentsData) {
            throw new ApiError(502, "Database is not connected to server")
        }

        let id = req.params.id
        let students = await studentsData.filter(student => student.id == id);

        if (students.length != 0) {
            return res.json({
                success: 1,
                data: students,
            })
        } else {
            throw new ApiError(404, "Record Didn't Match");

        }
    } catch (e) {
        next(e)
    }
}


exports.getStudentByFirstNameOrBranch = async(req, res, next) => {
    try {
        if (!studentsData) {
            throw new ApiError(502, "Database is not connected to server") // file connecting
        }

        let firstName = req.params.firstName;
        let branch = req.params.branch;

        let students = await studentsData.filter((student) => {
            return student.firstName == firstName && student.branch == branch;
        });

        if (students.length != 0) {
            return res.json({
                success: 1,
                data: students,
            })
        } else {
            throw new ApiError(404, "Record Doesn't Found");
        }
    } catch (e) {
        next(e)
    }
}


exports.addStudent = async(req, res, next) => {
    try {
        if (!studentsData) {
            throw new ApiError(502, "Database is not connected to server")
        }
        body = req.body;
        if (body.length == 0) {
            throw new ApiError(404, "Recevied body Are empty") // data empty
        }

        let dublicateEmail = await studentsData.filter(student => student.email == req.body.email);

        if (dublicateEmail.length != 0) {
            throw new ApiError(404, "!!Email Conflict found")
                // res.status(409).send({ message: "!!Email Conflict found" })
        } else {

            var student = {
                id: studentsData.length + 1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                gender: req.body.gender,
                mobileNumber: req.body.mobileNumber,
                address: req.body.address,
                branch: req.body.branch,
                status: "active"
            }

            let promise = new Promise((resolve, reject) => {
                resolve();
            })
            promise.then(() => {
                studentsData.push(student);
            }).then(() => {
                saveData.save(studentsData)
            }).then(() => {
                return res.json({
                    success: 1,
                    message: "Record Submit Sucessfully",
                })
            })
        }
    } catch (e) {
        next(e)
    }
}


exports.updateStudentData = async(req, res, next) => {
    try {
        if (!studentsData) {
            throw new ApiError(502, "Database is not connected to server")
        }

        const id = req.params.id;

        let index = await studentsData.findIndex((stud) => {
            return (stud.id == Number.parseInt(id));
        })
        if (index >= 0) {
            studentsData[index].mobileNumber = req.body.mobileNumber;
            studentsData[index].address = req.body.address;
            console.log(studentsData);

            let promise = new Promise((resolve, reject) => {
                resolve();
            })
            promise.then(() => {
                saveData.save(studentsData);
            }).then(() => {
                return res.json({
                    success: 1,
                    message: "Student Record update sucessfully",
                })
            })

        } else {
            throw new ApiError(404, "Record Doesn't Found");
        }
    } catch (e) {
        next(e)
    }
}


exports.deactiveStudentData = async(req, res, next) => {
    try {
        if (!studentsData) {
            throw new ApiError(502, "Database is not connected to server")
        }
        const id = req.params.id;
        let index = await studentsData.findIndex((stud) => {
            return (stud.id == Number.parseInt(id));
        })
        if (index >= 0) {
            studentsData[index].status = "deactive";

            let promise = new Promise((resolve, reject) => {
                resolve();
            })
            promise.then(() => {
                saveData.save(studentsData);
            }).then(() => {
                return res.json({
                    success: 1,
                    message: "Student Record Delete sucessfully",
                })
            })
        } else {
            throw new ApiError(404, "Record Didn't Found");
        }
    } catch (e) {
        next(e)
    }
}
next(e)
}
}