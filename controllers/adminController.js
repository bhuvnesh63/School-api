const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/asyncError");

const Admin = require("../modals/adminModal");
const sendToken = require("../utils/jwtTOken");
const sendEmail = require("../utils/sendEmail");

// Register a user
exports.registerAdmin = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const admin = await Admin.create({
    name,
    email,
    password,
    // avatar:{
    //     public_id:"this is sample id",
    //     url:"profilepicUrl",
    // }
  });

  sendToken(admin, 201, res);

  // const token= admin.getJWTToken();

  // res.status(201).json({
  //     success:true,
  //     token,
  // });
});

//login user

exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking  if user has given password and email

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email and password ", 400));
  }

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = admin.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(admin, 200, res);

  // const token= admin.getJWTToken();

  // res.status(200).json({
  //     success:true,
  //     token,
  // });
});

//admin logout

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// Forgot Password

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const admin = await Admin.findOne({ email: req.body.email });

  if (!admin) {
    return next(new ErrorHandler("Admin not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = admin.getResetPasswordToken();

  await admin.save({ validateBeforeSave: false });

  const resetPasswordurl = `${req.protocol}://${req.get(
    "host"
  )}/api/vi/password/reset/${resetToken}`;

  const message = `Your Password reset token is :- \n\n ${resetPasswordurl} \n\n If you have not requested this email then, please igonre it `;
  try {
    await sendEmail({
      email: admin.email,
      subject: `Admin Dashboard Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${admin.email} successfully`,
    });
  } catch (error) {
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password

exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const admin = await admin.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!admin) {
    return next(
      new ErrorHandler(
        "Reset Password token is invalid or has been expired ",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not matched  ", 400));
  }
  admin.password = req.body.password;
  admin.resetPasswordToken = undefined;
  admin.resetPasswordExpire = undefined;

  await admin.save();

  sendToken(admin,200,res)
});
