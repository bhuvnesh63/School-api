const ErrorHandler = require("../utils/errorhandler");
const asyncError = require("./asyncError");
const jwt = require("jsonwebtoken");
const Admin = require("../modals/adminModal");

exports.isAuthenticatedAdmin = asyncError(async (req, res, next) => {
  const { token } = req.cookies;

  //   console.log(token);
  if (!token) {
    return next(new ErrorHandler("Please login to access this resourse", 401));
  }

  const decodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.admin = await Admin.findById(decodeData._id);

  next();
});

// exports.authorizeRoles = (...roles) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//       new ErrorHandler(
//         `Role: ${req.user.role} is not allowed to access this resource`,
//         403
//       )
//       );
//     }

//     next();
//   };
// };
