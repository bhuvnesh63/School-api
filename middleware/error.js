const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //wrong mongodb ID error
  if (err.name === "CastError") {
    const message = `Resouce not found. Invalid: ${err.path}`;
    err= new ErrorHandler(message,400)
  }

  // MongoDB duplicate admin register error

  if (err.code===11000){
    const message= `Duplicate ${Object.keys(err.keyValue)} Entered`
    err= new ErrorHandler(message,400)
  }
  //wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid, try again`;
    err= new ErrorHandler(message,400)
  }

  //JWT Expire  error
  if (err.name === "TokenExpireError") {
    const message = `Json web token is Expire, try again`;
    err= new ErrorHandler(message,400)
  }

  res.status(err.statusCode).json({
    success: false,
    // error: err,
    message: err.message,
    // error:err.stack,
  });
};
