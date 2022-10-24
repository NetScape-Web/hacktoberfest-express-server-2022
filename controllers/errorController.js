import Problem from "../middlewares/problem";

const castErrorHandlerDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new Problem(message, 400);
};

const duplicateFieldsHandlerDB = (err) => {
  const fields = Object.keys(err.keyValue);
  const message = `The ${fields}: ${err.keyValue[fields]} already exist. Please use another ${fields}!`;
  return new Problem(message, 400);
};
const validationErrorHandlerDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new Problem(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    //  Log error
    console.error("ERROR ", err);

    //  Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    console.log(err);
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    console.log(error);

    if (error.name === "CastError" || error.kind === "ObjectId") {
      error = castErrorHandlerDB(error);
    } else if (error.code === 11000) {
      error = duplicateFieldsHandlerDB(error);
    } else if (
      error.name === "ValidationError" ||
      (error.errors
        ? error.errors[Object.keys(error.errors)[0]].name === "ValidatorError"
        : false)
    )
      error = validationErrorHandlerDB(error);

    sendErrorProd(error, res);
  }
};
