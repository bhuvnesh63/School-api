const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")


const errorMiddleware= require("./middleware/error")
app.use(express.json());
app.use(cookieParser())

//all routes import 
const student= require("./routes/studentsRoute");
const teacher= require("./routes/teacherRoute")
const admin= require("./routes/adminRoute");


app.use("/api/v1",student);
app.use("/api/v1",teacher);
app.use("/api/v1",admin)

// middleware for error 
app.use(errorMiddleware)

module.exports = app;
