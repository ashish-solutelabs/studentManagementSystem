const express = require('express');
const route = express();

var controller = require('../controllers/studentcontrollers');

const { addStudentValidation } = require('../controllers/StudentValidation/StudentValidation')

route.get("/student", controller.getStudent)
route.get("/student/get_student_by_branch_name/:branch", controller.getStudentByBranch)
route.get("/student/get_student_by_name/:firstName", controller.getStudentByName)
route.get('/student/get_student_by_email/:email', controller.getStudentByEmail)
route.get("/student/get_student_by_id/:id", controller.getStudentById)
route.get("/student/get_student_by_fristname_branch/:firstName/:branch", controller.getStudentByFirstNameOrBranch)

route.post("/student/addstudent", addStudentValidation, controller.addStudent);

route.patch("/student/update_student_data/:id", addStudentValidation, controller.updateStudentData);

route.delete("/student/delete_student_by_id/:id", controller.deactiveStudentData)

module.exports = route;