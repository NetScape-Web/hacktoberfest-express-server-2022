class Problem extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    /* expected and handled errors should be tagged operational
    to differentiate them form other server generated errors*/
    this.isOperational = true;

    /* remove the call to this class and the super class from
    the error stack trace.*/
    Error.captureStackTrace(this, this.constructor);
  }
}

export default Problem;
