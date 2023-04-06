const express= require("express");
const {  registerAdmin, loginAdmin, logout, forgotPassword, resetPassword } = require("../controllers/adminController");
const router=express.Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);



module.exports=router;