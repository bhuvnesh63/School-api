const express = require("express");
const { getAllTeachers , createTeacher, updateTeacher, deleteTeacher, getTeacherDetail, } = require("../controllers/teacherController");
const { isAuthenticatedAdmin,authorizeRoles } = require("../middleware/auth");

const router=express.Router();

//making routes
// for all students record
router.route("/teachers").get( getAllTeachers);

// =====================================
// route for add new student recod
router.route("/teachers/new").post(isAuthenticatedAdmin,createTeacher)
// authorizeRoles("admin"),
// ================================

// route for update recod of a student

router.route("/teachers/:id").put(isAuthenticatedAdmin,updateTeacher).delete(isAuthenticatedAdmin,deleteTeacher).get(isAuthenticatedAdmin,getTeacherDetail)
// authorizeRoles("admin"), 2 pr legaga.....(put,delete)
module.exports= router