const express = require("express");
const { getAllStudents , createStudent, updateStudent, deleteStudent, getStudentDetail, } = require("../controllers/studentController");
const { isAuthenticatedAdmin,authorizeRoles } = require("../middleware/auth");

const router=express.Router();

//making routes
// for all students record
router.route("/students").get( getAllStudents);

// =====================================
// route for add new student recod
router.route("/students/new").post(isAuthenticatedAdmin,createStudent)
// authorizeRoles("admin"),
// ================================

// route for update recod of a student

router.route("/students/:id").put(isAuthenticatedAdmin,updateStudent).delete(isAuthenticatedAdmin,deleteStudent).get(isAuthenticatedAdmin,getStudentDetail)
// authorizeRoles("admin"), 2 pr legaga.....(put,delete)
module.exports= router