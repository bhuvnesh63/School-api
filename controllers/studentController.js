const Student = require("../modals/studentModal");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/asyncError");
const ApiFeatures = require("../utils/apifeatures");


// create student --Admin
exports.createStudent = catchAsyncErrors(async (req, res, next) => {  
  const student = await Student.create(req.body);

  res.status(201).json({
    success: true,
    student,
  });
});

// get all students

exports.getAllStudents = catchAsyncErrors( async (req, res) => {
  // to seacrhing 

  const apiFeature= new ApiFeatures(Student.find(),req.query).search().filter();

// ======================================================
  // const allstudents = await Student.find();
    const allstudents = await apiFeature.query;

  res.status(200).json({
    success: true,
    allstudents,
  });
});

// Get single student
exports.getStudentDetail =catchAsyncErrors( async (req, res, next) => {
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(new ErrorHandler("Student not found ", 404));

    // return res.status(500).json({
    //   success: false,
    //   message: "Student not found",
    // });
  }
  res.status(200).json({
    success: true,
    student,
  });
});

// update a single student record--Admin

exports.updateStudent =catchAsyncErrors( async (req, res, next) => {
  let student = await Student.findById(req.params.id);

  if (!student) {
    return next(new ErrorHandler("Student not found ", 404));
  }

  student = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    student,
  });
});

// delete student

exports.deleteStudent =catchAsyncErrors( async (req, res, next) => {

  // req.body.student=req.student.id
  const student = await Student.findById(req.params.id);

  if (!student) {
    return next(new ErrorHandler("Student not found ", 404));
  }

  // ==========================================================================

  // another trick to delete one record

  // await student.deleteOne(req.params.id);

  //   ===========================================================================

  await Student.findOneAndDelete();

  res.status(200).json({
    success: true,
    message: "Student delete successfully",
  });
}) ;
