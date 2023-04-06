const Teacher = require("../modals/teacherModal");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/asyncError");
const ApiFeatures = require("../utils/apifeatures");


// create student --Admin
exports.createTeacher = catchAsyncErrors(async (req, res, next) => {  
  const teacher = await Teacher.create(req.body);

  res.status(201).json({
    success: true,
    teacher,
  });
});

// get all students

exports.getAllTeachers = catchAsyncErrors( async (req, res) => {
  // to seacrhing 

  const apiFeature= new ApiFeatures(Teacher.find(),req.query).search().filter();

// ======================================================
  // const allteachers = await Teacher.find();
    const allteachers = await apiFeature.query;

  res.status(200).json({
    success: true,
    allteachers,
  });
});

// Get single student
exports.getTeacherDetail =catchAsyncErrors( async (req, res, next) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorHandler("Teacher not found ", 404));

    // return res.status(500).json({
    //   success: false,
    //   message: "Student not found",
    // });
  }
  res.status(200).json({
    success: true,
    teacher,
  });
});

// update a single student record--Admin

exports.updateTeacher =catchAsyncErrors( async (req, res, next) => {
  let teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorHandler("Teacher not found ", 404));
  }

  teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    teacher,
  });
});

// delete student

exports.deleteTeacher =catchAsyncErrors( async (req, res, next) => {

  // req.body.student=req.student.id
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    return next(new ErrorHandler("Teacher not found ", 404));
  }

  // ==========================================================================

  // another trick to delete one record

  // await student.deleteOne(req.params.id);

  //   ===========================================================================

  await Teacher.findOneAndDelete();

  res.status(200).json({
    success: true,
    message: "Teacher delete successfully",
  });
}) ;
